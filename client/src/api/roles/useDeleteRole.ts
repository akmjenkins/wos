import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Role } from "./types";
import { APIError } from "../error";
import { fetchAndParse } from "../utils";
import { getRoleUrl } from "./urls";
import { roleKeys } from "./keys";
import { userKeys } from "../users/keys";

const removeRoleFromCache = (queryClient: QueryClient, roleId: string) => {
  queryClient.setQueriesData<Role[]>(
    { queryKey: roleKeys.all, exact: false },
    (data) => data?.filter((cachedRole) => cachedRole.id !== roleId)
  );
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation<Role, APIError, { id: string }>({
    mutationFn: ({ id }) => fetchAndParse(getRoleUrl(id), { method: "DELETE" }),
    onSuccess: ({ id }) => {
      removeRoleFromCache(queryClient, id);
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
      // when deleting a role, users with that role may be updated
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
