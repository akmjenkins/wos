import { useQuery } from "@tanstack/react-query";
import { PaginatedData } from "../types";
import { FetchUserParams, User } from "./types";
import { fetchAndParse } from "../utils";
import { getUsersListUrl } from "./urls";
import { userKeys } from "./keys";
import { APIError } from "../error";

export const useFetchUsers = (filters: FetchUserParams = { page: 1 }) =>
  useQuery<
    PaginatedData<User>,
    APIError,
    PaginatedData<User>,
    ReturnType<typeof userKeys.list>
  >({
    queryKey: userKeys.list(filters),
    queryFn: ({ queryKey: [, , { filters }] }) =>
      fetchAndParse(getUsersListUrl(filters)),
  });
