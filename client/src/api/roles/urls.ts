import { getBaseAPIUrl } from "../urls";
import { FetchRoleParams } from "./types";

export const getRolesUrl = () => `${getBaseAPIUrl()}/roles`;

export const getRolesListUrl = (filters: FetchRoleParams = { page: 1 }) => {
  const qs = new URLSearchParams({
    page: filters.page?.toString() ?? "",
  });
  return `${getRolesUrl()}?${qs.toString()}`;
};

export const getRoleUrl = (id: string | number) => `${getRolesUrl()}/${id}`;
