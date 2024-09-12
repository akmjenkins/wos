import { Flex, Spinner } from "@radix-ui/themes";
import { UsersTableFullRow } from "./UsersTableFullRow";

export const UsersTableLoading = () => (
  <UsersTableFullRow>
    <Flex minHeight={"50vh"} justify={"center"} align={"center"}>
      <Spinner />
    </Flex>
  </UsersTableFullRow>
);
