import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getUsersUrl } from "./urls";
import { User } from "./types";
import { userKeys } from "./keys";
import { APIError } from "../error";

export type CreateUserParams = {
  first: string;
  last: string;
  roleId: string;
};

export const useCreateUser = () => {
  const client = useQueryClient();
  return useMutation<User, APIError, CreateUserParams>({
    mutationFn: (params) =>
      fetchAndParse<User>(getUsersUrl(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(params),
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
