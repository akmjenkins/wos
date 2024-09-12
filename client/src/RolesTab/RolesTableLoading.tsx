import { Flex, Spinner } from "@radix-ui/themes";
import { RolesTableFullRow } from "./RolesTableFullRow";

export const RolesTableLoading = () => (
  <RolesTableFullRow>
    <Flex minHeight={"50vh"} justify={"center"} align={"center"}>
      <Spinner />
    </Flex>
  </RolesTableFullRow>
);
