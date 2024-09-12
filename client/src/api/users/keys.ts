import { FetchUserParams } from "./types";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: FetchUserParams) =>
    [...userKeys.lists(), { filters }] as const,
};
