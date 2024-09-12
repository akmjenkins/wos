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
import { CreateUserParams } from "../api/users/useCreateUser";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { getUserName } from "../api/users/utils";
import { User } from "../api/users/types";
import { useUpdateUser } from "../api/users/useUpdateUser";
import { useShowToast } from "../components/Toast/useShowToast";

type EditUserDialogProps = {
  open: boolean;
  onClose: () => void;
  user: User;
};

export const EditUserDialog = ({
  user,
  open,
  onClose,
}: EditUserDialogProps) => {
  const { mutateAsync, isError, error, reset, isPending } = useUpdateUser();

  const form = useForm<CreateUserParams>();
  const showToast = useShowToast();

  useEffect(() => {
    if (!open)
      form.reset({ first: user.first, last: user.last, roleId: user.roleId });
  }, [open, user, form]);

  return (
    <>
      <Dialog.Root
        onOpenChange={() => {
          if (isPending) return false;
          reset();
          onClose();
        }}
        open={open}
      >
        <Dialog.Content>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit((values) =>
                mutateAsync(
                  { id: user.id, ...values },
                  {
                    onSuccess: (user) => {
                      showToast({
                        title: "User updated",
                        description: (
                          <Text>
                            <Strong>{getUserName(user)}</Strong> has been
                            updated
                          </Text>
                        ),
                      });
                      onClose();
                    },
                  }
                )
              )}
            >
              <Dialog.Title>Update user</Dialog.Title>
              <Dialog.Description>
                Modify {getUserName(user)} in your organization
              </Dialog.Description>
              {isError ? (
                <Callout.Root mb={"5"} color="red" role="alert">
                  <Callout.Icon>
                    <ExclamationTriangleIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Failed to update user: {error.message}
                  </Callout.Text>
                </Callout.Root>
              ) : null}
              <Section size={"1"}>
                <UserForm />
              </Section>
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
                      <Spinner /> Updating user...
                    </>
                  ) : (
                    <>Update user</>
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
