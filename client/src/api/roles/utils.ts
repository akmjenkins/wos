import { Role } from "./types";

export const sortRolesByDefault = (roles: Role[]) =>
  [...roles].sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    return a.name.localeCompare(b.name);
  });
