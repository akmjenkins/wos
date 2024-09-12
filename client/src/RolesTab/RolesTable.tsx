import { Table } from "@radix-ui/themes";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";
import { RolesTableRow } from "./RolesTableRow";
import { RolesTableLoading } from "./RolesTableLoading";
import { RolesTableError } from "./RolesTableError";

export const RolesTable = () => {
  const { data, isLoading, isError, refetch } = useFetchAllRoles();
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading ? <RolesTableLoading /> : null}
        {isError ? <RolesTableError onClickRetry={() => refetch()} /> : null}
        {data?.map((role) => (
          <RolesTableRow role={role} key={role.id} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};
