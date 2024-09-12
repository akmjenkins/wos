import { Spinner, Text } from "@radix-ui/themes";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";

type RoleLabelProps = {
  id: string;
};

export const RoleLabel = ({ id }: RoleLabelProps) => {
  const { data, isError, isPending } = useFetchAllRoles();

  if (isPending) return <Spinner />;

  if (isError) return <Text>Failed to fetch roles</Text>;

  return (
    <Text>{data.find((role) => role.id === id)?.name ?? "Unknown Role"}</Text>
  );
};
