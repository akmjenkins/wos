import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getUserUrl } from "./urls";
import { User } from "./types";
import { userKeys } from "./keys";

type UpdateUserParams = {
  id: string | number;
  first?: string;
  last?: string;
  roleId?: string;
};

export const useUpdateUser = ({ id, ...rest }: UpdateUserParams) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () =>
      fetchAndParse<User>(getUserUrl(id), {
        method: "PATCH",
        body: JSON.stringify(rest),
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
