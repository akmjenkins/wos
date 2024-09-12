import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getRoleUrl } from "./urls";
import { Role } from "./types";
import { roleKeys } from "./keys";
import { APIError } from "../error";
import { sortRolesByDefault } from "./utils";
import { queryClient } from "../queryClient";

export type UpdateRoleParams = {
  id: string;
  name?: string;
  description?: string;
  isDefault?: boolean;
};

const updateRoleInCache = (updatedRole: Role, client = queryClient) => {
  client.setQueriesData<Role[]>(
    { queryKey: roleKeys.all, exact: false },
    (data) => {
      if (!data) return;
      const isNewDefaultRole = updatedRole.isDefault;
      return sortRolesByDefault(
        data.map((cachedRole) => {
          if (cachedRole.id === updatedRole.id) return updatedRole;
          if (!isNewDefaultRole) return cachedRole;
          if (cachedRole.isDefault) return { ...cachedRole, isDefault: false };
          return cachedRole;
        })
      );
    }
  );
};

export const useUpdateRole = () => {
  const client = useQueryClient();
  return useMutation<Role, APIError, UpdateRoleParams>({
    mutationFn: ({ id, ...rest }) =>
      fetchAndParse<Role>(getRoleUrl(id), {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(rest),
      }),
    onSuccess: (updateRole) => {
      client.invalidateQueries({ queryKey: roleKeys.all });
      updateRoleInCache(updateRole);
    },
  });
};
