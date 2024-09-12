import {
  Avatar,
  DropdownMenu,
  Flex,
  IconButton,
  Table,
  Text,
} from "@radix-ui/themes";
import { User } from "../api/users/types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { RoleLabel } from "./RoleLabel";

const getUserInitials = (user: User) => `${user.first[0]}${user.last[0]}`;

export const UserRow = ({ user }: { user: User }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <Table.Row align={"center"}>
      <Table.RowHeaderCell>
        <Flex align={"center"} gap={"3"}>
          <Avatar
            width={5}
            height={5}
            radius="full"
            src={user.photo}
            fallback={getUserInitials(user)}
          />
          <Text>
            {user.first} {user.last}
          </Text>
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <RoleLabel id={user.roleId} />
      </Table.Cell>
      <Table.Cell>
        {new Date(user.createdAt).toLocaleDateString(undefined, {
          dateStyle: "medium",
        })}
      </Table.Cell>
      <Table.Cell>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton radius="full" color="gray" variant="ghost">
              <DotsHorizontalIcon />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item>Edit User</DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => setDeleteDialogOpen(true)}
              color="red"
            >
              Delete User
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DeleteUserDialog
          user={user}
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        />
      </Table.Cell>
    </Table.Row>
  );
};
