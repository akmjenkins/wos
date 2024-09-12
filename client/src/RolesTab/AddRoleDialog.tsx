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
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CreateRoleParams, useCreateRole } from "../api/roles/useCreateRole";
import { RoleForm } from "./RoleForm";
import { useShowToast } from "../components/Toast/useShowToast";

type AddRoleDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AddRoleDialog = ({ open, onClose }: AddRoleDialogProps) => {
  const { mutateAsync, isError, error, reset, isPending } = useCreateRole();

  const form = useForm<CreateRoleParams>();
  const showToast = useShowToast();

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
                mutateAsync(values, {
                  onSuccess: (role) => {
                    showToast({
                      title: "Role created",
                      description: (
                        <Text>
                          <Strong>{role.name}</Strong> has been created
                        </Text>
                      ),
                    });
                    onClose();
                  },
                })
              )}
            >
              <Dialog.Title>Add role</Dialog.Title>
              <Dialog.Description>
                Creates a new role that can be assigned to users
              </Dialog.Description>
              {isError ? (
                <Callout.Root mb={"5"} color="red" role="alert">
                  <Callout.Icon>
                    <ExclamationTriangleIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Failed to create role: {error.message}
                  </Callout.Text>
                </Callout.Root>
              ) : null}
              <Section size={"1"}>
                <RoleForm />
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
                      <Spinner /> Adding role...
                    </>
                  ) : (
                    <>Add role</>
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
