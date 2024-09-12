import {
  AlertDialog,
  Button,
  Callout,
  Flex,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Role } from "../api/roles/types";
import { useDeleteRole } from "../api/roles/useDeleteRole";
import { useDefaultRole } from "../api/roles/useDefaultRole";
import { useShowToast } from "../components/Toast/useShowToast";

type DeleteRoleDialogProps = {
  open: boolean;
  role: Role;
  onClose: () => void;
};

export const DeleteRoleDialog = ({
  open,
  onClose,
  role,
}: DeleteRoleDialogProps) => {
  const { mutate, isPending, isError, reset } = useDeleteRole();
  const showToast = useShowToast();
  return (
    <>
      <AlertDialog.Root
        onOpenChange={() => {
          if (isPending) return;
          reset();
          onClose();
        }}
        open={open}
      >
        <AlertDialog.Content>
          {isError ? (
            <Callout.Root mb={"5"} color="red" role="alert">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>
              <Callout.Text>
                An error occurred when attempting to delete{" "}
                <Strong>{role.name}</Strong>.
              </Callout.Text>
            </Callout.Root>
          ) : null}
          <AlertDialog.Title>Delete user</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure? The role <Strong>{role.name}</Strong> will be
            permanently deleted. Any users with this role will be updated and
            assigned a role of <Strong>{useDefaultRole()}</Strong>
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel disabled={isPending}>
              <Button color="gray" variant="surface">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  mutate(
                    { id: role.id },
                    {
                      onSuccess: (role) => {
                        showToast({
                          title: "Role deleted",
                          description: (
                            <Text>
                              <Strong>{role.name}</Strong> has been deleted
                            </Text>
                          ),
                        });
                      },
                    }
                  );
                }}
                variant="surface"
              >
                {isPending ? (
                  <>
                    <Spinner /> Deleting role...
                  </>
                ) : (
                  <>Delete role</>
                )}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};
