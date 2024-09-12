import { Box, Button, Flex } from "@radix-ui/themes";
import { UsersTableFullRow } from "./UsersTableFullRow";

type UsersTableErrorProps = {
  onClickRetry: () => void;
};

export const UsersTableError = ({ onClickRetry }: UsersTableErrorProps) => (
  <UsersTableFullRow>
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
  </UsersTableFullRow>
);
