import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getUserUrl } from "./urls";
import { User } from "./types";
import { userKeys } from "./keys";
import { APIError } from "../error";
import { PaginatedData } from "../types";

type UpdateUserParams = {
  id: string | number;
  first?: string;
  last?: string;
  roleId?: string;
};

const updateUserInCache = (queryClient: QueryClient, user: User) => {
  queryClient.setQueriesData<PaginatedData<User>>(
    { queryKey: userKeys.lists(), exact: false },
    (data) => {
      if (!data) return;

      const itemIndexInPage = data.data.findIndex(
        (userInCache) => user.id === userInCache.id
      );

      if (itemIndexInPage === -1) return data;

      return {
        ...data,
        data: data.data.map((userInCache, idx) =>
          idx === itemIndexInPage ? user : userInCache
        ),
      };
    }
  );
};

export const useUpdateUser = () => {
  const client = useQueryClient();
  return useMutation<User, APIError, UpdateUserParams>({
    mutationFn: ({ id, ...rest }) =>
      fetchAndParse<User>(getUserUrl(id), {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(rest),
      }),
    onSuccess: (user) => {
      updateUserInCache(client, user);
      client.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
