import { useFetchAllRoles } from "./useFetchAllRoles";

export const useDefaultRole = () =>
  useFetchAllRoles().data?.find(({ isDefault }) => isDefault)?.name;
