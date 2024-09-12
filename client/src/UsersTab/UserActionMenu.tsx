import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { User } from "../api/users/types";
import { useState } from "react";

type UserActionMenuProps = {
  user: User;
};

export const UserActionMenu = ({ user }: UserActionMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton radius="full" color="gray" variant="ghost">
            <DotsHorizontalIcon />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Item onClick={() => setEditDialogOpen(true)}>
            Edit User
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={() => setDeleteDialogOpen(true)}
            color="red"
          >
            Delete User
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <EditUserDialog
        user={user}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
      <DeleteUserDialog
        user={user}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};
