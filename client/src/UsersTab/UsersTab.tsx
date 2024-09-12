import { Section } from "@radix-ui/themes";
import { UsersTabHeader } from "./UsersTabHeader";
import { UsersTable } from "./UsersTable";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { useFetchUsers } from "../api/users/useFetchUsers";

export const UsersTab = () => {
  const [params, setParams] = useState({ page: 1, search: "" });
  const { data, isLoading, isRefetching, error, refetch } =
    useFetchUsers(params);

  // if the user deleted the last user while they are viewing page 2
  // for example, rather than show an empty page 2, reset the page to 1
  // this can be inferred if there are no users in the current query and the
  // current page is not equal to 1
  const shouldResetPageToOne =
    data && data.data?.length === 0 && params.page !== 1;
  useEffect(() => {
    if (shouldResetPageToOne) setParams((p) => ({ ...p, page: 1 }));
  }, [shouldResetPageToOne]);

  return (
    <>
      <Section size={"1"}>
        <UsersTabHeader
          onChangeSearchValue={useDebounceCallback((search) => {
            setParams({ page: 1, search });
          }, 350)}
        />
      </Section>
      <Section size={"1"}>
        <UsersTable
          hasNext={!!data?.next}
          hasPrevious={!!data?.prev}
          onNext={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
          onPrevious={() => setParams((p) => ({ ...p, page: p.page - 1 }))}
          users={data?.data ?? []}
          isLoading={isLoading}
          isRefreshing={isRefetching}
          error={error ?? undefined}
          refetch={() => refetch()}
        />
      </Section>
    </>
  );
};
