import { getBaseAPIUrl } from "../urls";
import { FetchUserParams } from "./types";

export const getUsersUrl = () => `${getBaseAPIUrl()}/users`;

export const getUsersListUrl = (filters: FetchUserParams) => {
  const qs = new URLSearchParams({
    search: filters.search?.toString() ?? "",
    page: filters.page?.toString() ?? "",
  });
  return `${getUsersUrl()}?${qs.toString()}`;
};

export const getUserUrl = (id: string | number) => `${getUsersUrl()}/${id}`;
