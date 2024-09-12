import { Strong, Table, Text } from "@radix-ui/themes";
import { Role } from "../api/roles/types";
import { RoleActionMenu } from "./RoleActionMenu";

type RolesTableRowProps = {
  role: Role;
};

export const RolesTableRow = ({ role }: RolesTableRowProps) => (
  <Table.Row align={"center"}>
    <Table.RowHeaderCell>
      <Text>
        {role.name} {role.isDefault ? <Strong>(Default)</Strong> : null}
      </Text>
    </Table.RowHeaderCell>
    <Table.Cell>
      <Text>{role.description}</Text>
    </Table.Cell>
    <Table.Cell>
      <RoleActionMenu role={role} />
    </Table.Cell>
  </Table.Row>
);
