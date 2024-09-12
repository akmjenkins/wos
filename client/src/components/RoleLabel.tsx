import { Box, Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";
import { SymbolIcon } from "@radix-ui/react-icons";

type RoleLabelProps = {
  id: string;
};

export const RoleLabel = ({ id }: RoleLabelProps) => {
  const { data, isError, refetch, isFetching } = useFetchAllRoles();

  if (isError)
    return (
      <Flex gap={"2"} align={"center"}>
        <Box>
          <Text>Failed to fetch role</Text>
        </Box>
        <IconButton size={"1"} variant="ghost" onClick={() => refetch()}>
          <SymbolIcon />
        </IconButton>
      </Flex>
    );

  const roleName = data?.find((role) => role.id === id)?.name;

  if (roleName) return <Text>{roleName}</Text>;

  if (isFetching) return <Spinner />;

  return <Text>Unknown Role</Text>;
};
