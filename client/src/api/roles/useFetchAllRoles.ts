import { useQuery } from "@tanstack/react-query";
import { PaginatedData } from "../types";
import { Role } from "./types";
import { fetchAndParse } from "../utils";
import { getRolesListUrl } from "./urls";
import { roleKeys } from "./keys";

export const useFetchAllRoles = () =>
  useQuery({
    queryKey: roleKeys.all,
    queryFn: async () => {
      let page = 1;
      const results = [];
      while (page) {
        const response = await fetchAndParse<PaginatedData<Role>>(
          getRolesListUrl({ page })
        );
        results.push(...response.data);
        if (!response.next) break;
        page++;
      }
      results.sort((a) => (a.isDefault ? -1 : 1));
      return results;
    },
  });
