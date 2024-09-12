import { queryClient } from "../queryClient";
import { roleKeys } from "./keys";
import { Role } from "./types";

export const sortRolesByDefault = (roles: Role[]) =>
  [...roles].sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return a.name.localeCompare(b.name);
  });

export const removeRoleFromCache = (roleId: string, client = queryClient) => {
  client.setQueriesData<Role[]>(
    { queryKey: roleKeys.all, exact: false },
    (data) => data?.filter((cachedRole) => cachedRole.id !== roleId)
  );
};
