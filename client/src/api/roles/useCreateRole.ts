import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAndParse } from "../utils";
import { getRolesUrl } from "./urls";
import { Role } from "./types";
import { roleKeys } from "./keys";
import { APIError } from "../error";

export type CreateRoleParams = {
  name: string;
  description: string;
  isDefault?: boolean;
};

export const useCreateRole = () => {
  const client = useQueryClient();
  return useMutation<Role, APIError, CreateRoleParams>({
    mutationFn: (params) =>
      fetchAndParse<Role>(getRolesUrl(), {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(params),
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: roleKeys.all });
    },
  });
};
