import { Table } from "@radix-ui/themes";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";
import { RolesTableRow } from "./RolesTableRow";
import { RolesTableLoading } from "./RolesTableLoading";
import { RolesTableError } from "./RolesTableError";

type RolesTableProps = {
  filter: string;
};

export const RolesTable = ({ filter }: RolesTableProps) => {
  const { data, isLoading, isError, refetch } = useFetchAllRoles();

  const regexpFilter = new RegExp(filter, "i");
  const filtered = data?.filter(
    ({ name, description }) =>
      name.match(regexpFilter) || description?.match(regexpFilter)
  );

  return (
    <Table.Root layout={"fixed"} variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width={"250px"}>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width={"50px"} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading ? <RolesTableLoading /> : null}
        {isError ? <RolesTableError onClickRetry={() => refetch()} /> : null}
        {filtered?.map((role) => (
          <RolesTableRow role={role} key={role.id} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};
