import { Box, Button, Flex } from "@radix-ui/themes";
import { RolesTableFullRow } from "./RolesTableFullRow";

type RolesTableErrorProps = {
  onClickRetry: () => void;
};

export const RolesTableError = ({ onClickRetry }: RolesTableErrorProps) => (
  <RolesTableFullRow>
    <Flex
      minHeight={"50vh"}
      justify={"center"}
      direction={"column"}
      gap={"2"}
      align={"center"}
    >
      <Box pb={"2"}>An error occurred retrieving users</Box>
      <Button variant="surface" color="red" onClick={onClickRetry}>
        Retry
      </Button>
    </Flex>
  </RolesTableFullRow>
);
