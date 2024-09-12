import {
  Button,
  Callout,
  Dialog,
  Flex,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";
import { UserForm } from "./UserForm";
import { CreateUserParams, useCreateUser } from "../api/users/useCreateUser";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";
import { useEffect, useState } from "react";
import { Toast } from "../Toast";
import { getUserName } from "../api/users/utils";
import { RoleLabel } from "./RoleLabel";

type AddUserDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AddUserDialog = ({ open, onClose }: AddUserDialogProps) => {
  const { data: roles } = useFetchAllRoles();
  const { mutateAsync, isError, error, data: createdUser } = useCreateUser();

  const form = useForm<CreateUserParams>();
  const [showUserCreatedToast, setShowUserCreatedToast] = useState(false);

  const defaultRoleId = roles?.find(({ isDefault }) => isDefault)?.id;
  useEffect(() => {
    // only set the default value for the roleId if the default role has changed (or been fetched for the first time)
    // when the dialog is closed. Otherwise we could end up resetting the users fields as they type
    // resulting in a bad UI state and uncomfortable UX (field values changing out from under people)
    if (!open) form.reset({ roleId: defaultRoleId });
  }, [open, form, defaultRoleId]);

  return (
    <>
      <Dialog.Root onOpenChange={onClose} open={open}>
        <Dialog.Content>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                try {
                  await mutateAsync(values, {
                    onSuccess: () => {
                      setShowUserCreatedToast(true);
                      onClose();
                    },
                  });
                } catch {
                  // pass, handled by updating of isError
                  // we make this async so that form.formState.isSubmitting accurately
                  // reflects the submission state
                }
              })}
            >
              <Dialog.Title>Add User</Dialog.Title>
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
              <UserForm />
              <Flex gap="3" mt="4" justify="end">
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
                      <Spinner /> Adding User...
                    </>
                  ) : (
                    <>Add User</>
                  )}
                </Button>
              </Flex>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Root>
      <Toast
        title={
          createdUser ? <Strong>User created successfully</Strong> : undefined
        }
        description={
          createdUser ? (
            <Text>
              {getUserName(createdUser)} created with a role of{" "}
              <RoleLabel id={createdUser.roleId} />
            </Text>
          ) : undefined
        }
        open={showUserCreatedToast}
        onClose={() => setShowUserCreatedToast(false)}
      />
    </>
  );
};
