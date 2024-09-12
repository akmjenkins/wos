import { Flex } from "@radix-ui/themes";
import { UsersTabHeader } from "./UsersTabHeader";
import { UsersTable } from "./UsersTable";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useFetchUsers } from "../api/users/useFetchUsers";

export const UsersTab = () => {
  const [params, setParams] = useState({ page: 1, search: "" });
  const users = useFetchUsers(params);

  return (
    <Flex direction={"column"} gap={"5"}>
      <UsersTabHeader
        onChangeSearchValue={useDebounceCallback((search) => {
          setParams({ page: 1, search });
        }, 350)}
      />
      <UsersTable
        hasNext={!!users.data?.next}
        hasPrevious={!!users.data?.prev}
        onNext={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
        onPrevious={() => setParams((p) => ({ ...p, page: p.page - 1 }))}
        users={users.data?.data ?? []}
        isLoading={users.isLoading}
        isRefreshing={users.isRefetching}
        error={users.error ?? undefined}
        refetch={() => users.refetch()}
      />
    </Flex>
  );
};
