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
import { RoleForm } from "./RoleForm";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import { Role } from "../api/roles/types";
import { useUpdateRole } from "../api/roles/useUpdateRole";
import { CreateRoleParams } from "../api/roles/useCreateRole";
import { useShowToast } from "../components/Toast/useShowToast";

type EditRoleDialogProps = {
  open: boolean;
  onClose: () => void;
  role: Role;
};

export const EditRoleDialog = ({
  role,
  open,
  onClose,
}: EditRoleDialogProps) => {
  const { mutateAsync, isError, error, isPending, reset } = useUpdateRole();

  const form = useForm<CreateRoleParams>();
  const showToast = useShowToast();

  useEffect(() => {
    if (!open)
      form.reset({
        name: role.name,
        description: role.description,
        isDefault: role.isDefault,
      });
  }, [open, role, form]);

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
                  { id: role.id, ...values },
                  {
                    onSuccess: (role) => {
                      showToast({
                        title: "Role updated",
                        description: (
                          <Text>
                            <Strong>{role.name}</Strong> has been updated
                          </Text>
                        ),
                      });
                      onClose();
                    },
                  }
                )
              )}
            >
              <Dialog.Title>Edit role</Dialog.Title>
              <Dialog.Description>Update {role.name}</Dialog.Description>
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
                <RoleForm />
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
                      <Spinner /> Updating role...
                    </>
                  ) : (
                    <>Update role</>
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
