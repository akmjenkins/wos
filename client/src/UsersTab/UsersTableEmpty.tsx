import { Flex } from "@radix-ui/themes";
import { UsersTableFullRow } from "./UsersTableFullRow";

export const UsersTableEmpty = () => (
  <UsersTableFullRow>
    <Flex minHeight={"50vh"} justify={"center"} align={"center"}>
      No users
    </Flex>
  </UsersTableFullRow>
);
