import { Spinner } from "@radix-ui/themes";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";

type RoleLabelProps = {
  id: string;
};

export const RoleLabel = ({ id }: RoleLabelProps) => {
  const { data, isError, isPending } = useFetchAllRoles();

  if (isPending) return <Spinner />;

  if (isError) return <>Failed to fetch roles</>;

  return data.find((role) => role.id === id)?.name ?? "Unknown Role";
};
