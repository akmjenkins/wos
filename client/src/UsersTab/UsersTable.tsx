import { Flex, Spinner, Table } from "@radix-ui/themes";
import { UserRow } from "./UserRow";
import { User } from "../api/users/types";
import { APIError } from "../api/error";
import { TablePagination, TablePaginationProps } from "../TablePagination";

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
        {isLoading ? (
          <Table.Row>
            <Table.Cell colSpan={4}>
              <Flex
                style={{ width: "100%", minHeight: "50vh" }}
                justify={"center"}
                align={"center"}
              >
                <Spinner />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ) : null}
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
        <Table.Row>
          <Table.Cell colSpan={4}>
            <TablePagination
              {...{ hasNext, hasPrevious, onNext, onPrevious }}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};
