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

const removeRoleFromCache = (
  queryClient: QueryClient,
  userId: string | number
) => {
  queryClient.setQueriesData<Role[]>(
    { queryKey: roleKeys.all, exact: false },
    (data) => {
      if (!data) return;

      const itemIndexInPage = data.findIndex(
        (role) => role.id === userId.toString()
      );

      if (itemIndexInPage === -1) return data;

      return {
        ...data,
        data: data.filter((_, idx) => idx !== itemIndexInPage),
      };
    }
  );
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation<Role, APIError, { id: string | number }>({
    mutationFn: ({ id }) => fetchAndParse(getRoleUrl(id), { method: "DELETE" }),
    onSuccess: ({ id }) => {
      removeRoleFromCache(queryClient, id);
      queryClient.invalidateQueries({ queryKey: roleKeys.all });
    },
  });
};
