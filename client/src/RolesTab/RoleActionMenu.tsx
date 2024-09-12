import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { Role } from "../api/roles/types";
import { DeleteRoleDialog } from "./DeleteRoleDialog";
import { EditRoleDialog } from "./EditRoleDialog";

type RoleActionMenuProps = {
  role: Role;
};

export const RoleActionMenu = ({ role }: RoleActionMenuProps) => {
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
            Edit Role
          </DropdownMenu.Item>
          {role.isDefault ? null : (
            <DropdownMenu.Item
              onClick={() => setDeleteDialogOpen(true)}
              color="red"
            >
              Delete Role
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <EditRoleDialog
        role={role}
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
      />
      <DeleteRoleDialog
        role={role}
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </>
  );
};
