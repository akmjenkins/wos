import { Strong, Table } from "@radix-ui/themes";
import { Role } from "../api/roles/types";
import { RoleActionMenu } from "./RoleActionMenu";

type RolesTableRowProps = {
  role: Role;
};

export const RolesTableRow = ({ role }: RolesTableRowProps) => (
  <Table.Row align={"center"}>
    <Table.RowHeaderCell>
      {role.name} {role.isDefault ? <Strong>(Default)</Strong> : null}
    </Table.RowHeaderCell>
    <Table.Cell>{role.description}</Table.Cell>
    <Table.Cell>
      <RoleActionMenu role={role} />
    </Table.Cell>
  </Table.Row>
);
