import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./types";
import { APIError } from "../error";
import { fetchAndParse } from "../utils";
import { getUserUrl } from "./urls";
import { userKeys } from "./keys";
import { removeUserFromCache } from "./utils";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, APIError, { id: string }>({
    mutationFn: ({ id }) => fetchAndParse(getUserUrl(id), { method: "DELETE" }),
    onSuccess: ({ id }) => {
      removeUserFromCache(id);
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};
