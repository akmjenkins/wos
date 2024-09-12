import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Role } from "./types";
import { APIError } from "../error";
import { fetchAndParse } from "../utils";
import { getRoleUrl } from "./urls";
import { roleKeys } from "./keys";
import { userKeys } from "../users/keys";

import { removeRoleFromCache } from "./utils";
import { updateUserInCache } from "../users/utils";

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation<Role, APIError, { id: string }>({
    mutationFn: ({ id }) => fetchAndParse(getRoleUrl(id), { method: "DELETE" }),
    onSuccess: ({ id }) => {
      const defaultRoleId = queryClient
        .getQueryData<Role[]>(roleKeys.all)
        ?.find(({ isDefault }) => isDefault)?.id;

      // update users with this role to the default role
      if (defaultRoleId)
        updateUserInCache((user) =>
          user.roleId === id ? { ...user, roleId: defaultRoleId } : user
        );

      removeRoleFromCache(id);

      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      // refetch users
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
