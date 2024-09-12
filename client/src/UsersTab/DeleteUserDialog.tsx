import {
  AlertDialog,
  Button,
  Callout,
  Flex,
  Spinner,
  Strong,
  Text,
} from "@radix-ui/themes";
import { User } from "../api/users/types";
import { getUserName } from "../api/users/utils";
import { useDeleteUser } from "../api/users/useDeleteUser";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useShowToast } from "../components/Toast/useShowToast";

type DeleteUserDialogProps = {
  open: boolean;
  user: User;
  onClose: () => void;
};

export const DeleteUserDialog = ({
  open,
  onClose,
  user,
}: DeleteUserDialogProps) => {
  const showToast = useShowToast();
  const { mutate, isPending, isError, reset } = useDeleteUser();
  return (
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
              <Strong>{getUserName(user)}</Strong>.
            </Callout.Text>
          </Callout.Root>
        ) : null}
        <AlertDialog.Title>Delete user</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure? The user <Strong>{getUserName(user)}</Strong> will be
          permanently deleted
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
                  { id: user.id },
                  {
                    onSuccess: (user) => {
                      showToast({
                        title: "User deleted",
                        description: (
                          <Text>
                            <Strong>{getUserName(user)}</Strong> has been
                            deleted
                          </Text>
                        ),
                      });
                      onClose();
                    },
                  }
                );
              }}
              variant="surface"
            >
              {isPending ? (
                <>
                  <Spinner /> Deleting user...
                </>
              ) : (
                <>Delete user</>
              )}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
