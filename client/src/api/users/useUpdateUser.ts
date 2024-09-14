import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getUserUrl } from "./urls";
import { User } from "./types";
import { userKeys } from "./keys";
import { APIError } from "../error";
import { updateUserInCache } from "./utils";

export type UpdateUserParams = {
  id: string | number;
  first?: string;
  last?: string;
  roleId?: string;
};

export const useUpdateUser = () => {
  const client = useQueryClient();
  return useMutation<User, APIError, UpdateUserParams>({
    mutationFn: ({ id, ...rest }) =>
      fetchAndParse<User>(getUserUrl(id), {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(rest),
      }),
    onSuccess: (user) => {
      updateUserInCache((cachedUser) =>
        cachedUser.id === user.id ? user : cachedUser
      );
      client.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
