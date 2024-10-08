import {
  Button,
  Callout,
  Dialog,
  Flex,
  Section,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { UserForm } from "./UserForm";
import { CreateUserParams, useCreateUser } from "../api/users/useCreateUser";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";
import { useEffect } from "react";
import { getUserName } from "../api/users/utils";
import { RoleLabel } from "../components/RoleLabel";
import { useShowToast } from "../components/Toast/useShowToast";

type AddUserDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AddUserDialog = ({ open, onClose }: AddUserDialogProps) => {
  const { data: roles } = useFetchAllRoles();
  const { mutateAsync, isError, error, reset, isPending } = useCreateUser();

  const form = useForm<CreateUserParams>();
  const showToast = useShowToast();

  const defaultRoleId = roles?.find(({ isDefault }) => isDefault)?.id;
  useEffect(() => {
    // only set the default value for the roleId if the default role has changed (or been fetched for the first time)
    // when the dialog is closed. Otherwise we could end up resetting the users fields as they type
    // resulting in a bad UI state and uncomfortable UX (field values changing out from under people)
    if (!open) form.reset({ roleId: defaultRoleId });
  }, [open, form, defaultRoleId]);

  return (
    <>
      <Dialog.Root
        onOpenChange={() => {
          if (isPending) return false;
          onClose();
          reset();
        }}
        open={open}
      >
        <Dialog.Content>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                mutateAsync(values, {
                  onSuccess: (user) => {
                    showToast({
                      title: "User created",
                      description: (
                        <Text>
                          <Strong>{getUserName(user)}</Strong> created with a
                          role of <RoleLabel id={user.roleId} />
                        </Text>
                      ),
                    });
                    onClose();
                  },
                })
              )}
            >
              <Dialog.Title>Add user</Dialog.Title>
              <Dialog.Description>
                Create a new user in your organization
              </Dialog.Description>
              {isError ? (
                <Callout.Root mb={"5"} color="red" role="alert">
                  <Callout.Icon>
                    <ExclamationTriangleIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Failed to create user: {error.message}
                  </Callout.Text>
                </Callout.Root>
              ) : null}
              <Section size={"1"}>
                <UserForm />
              </Section>
              <Flex gap="3" justify="end">
                <Dialog.Close disabled={form.formState.isSubmitting}>
                  <Button variant="surface" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  variant="surface"
                  disabled={form.formState.isSubmitting}
                  type="submit"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Spinner /> Adding user...
                    </>
                  ) : (
                    <>Add user</>
                  )}
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
