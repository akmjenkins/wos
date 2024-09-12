import { Table } from "@radix-ui/themes";
import { UserRow } from "./UserRow";
import { User } from "../api/users/types";
import { APIError } from "../api/error";
import {
  TablePagination,
  TablePaginationProps,
} from "../components/TablePagination";
import { UsersTableEmpty } from "./UsersTableEmpty";
import { UsersTableLoading } from "./UsersTableLoading";
import { UsersTableError } from "./UsersTableError";
import { UsersTableFullRow } from "./UsersTableFullRow";

type UsersTableProps = {
  users: User[];
  error?: APIError;
  isLoading: boolean;
  isRefreshing: boolean;
  refetch: () => void;
} & TablePaginationProps;

export const UsersTable = ({
  users,
  error,
  isLoading,
  isRefreshing,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  refetch,
}: UsersTableProps) => {
  const isEmpty = !isLoading && !users.length;
  const hasNextOrPrevious = !!hasNext || !!hasPrevious;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>User</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Joined</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {error ? <UsersTableError onClickRetry={() => refetch()} /> : null}
        {isEmpty ? <UsersTableEmpty /> : null}
        {isLoading ? <UsersTableLoading /> : null}
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
        {hasNextOrPrevious ? (
          <UsersTableFullRow>
            <TablePagination
              {...{ hasNext, hasPrevious, onNext, onPrevious }}
            />
          </UsersTableFullRow>
        ) : null}
      </Table.Body>
    </Table.Root>
  );
};
