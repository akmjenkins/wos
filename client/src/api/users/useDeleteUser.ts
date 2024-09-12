import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { User } from "./types";
import { APIError } from "../error";
import { fetchAndParse } from "../utils";
import { getUserUrl } from "./urls";
import { userKeys } from "./keys";
import { PaginatedData } from "../types";

const removeUserFromCache = (queryClient: QueryClient, userId: string) => {
  queryClient.setQueriesData<PaginatedData<User>>(
    { queryKey: userKeys.lists(), exact: false },
    (data) => {
      if (!data) return;

      const itemIndexInPage = data.data.findIndex((user) => user.id === userId);

      if (itemIndexInPage === -1) return data;

      return {
        ...data,
        data: data.data.filter((_, idx) => idx !== itemIndexInPage),
      };
    }
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, APIError, { id: string }>({
    mutationFn: ({ id }) => fetchAndParse(getUserUrl(id), { method: "DELETE" }),
    onSuccess: ({ id }) => {
      removeUserFromCache(queryClient, id);
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
