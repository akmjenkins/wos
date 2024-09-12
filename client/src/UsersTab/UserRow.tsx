import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { User } from "../api/users/types";
import { RoleLabel } from "../components/RoleLabel";
import { UserActionMenu } from "./UserActionMenu";
import { getUserInitials } from "../api/users/utils";

export const UserRow = ({ user }: { user: User }) => {
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
        <UserActionMenu user={user} />
      </Table.Cell>
    </Table.Row>
  );
};
