import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { AddUserDialog } from "./AddUserDialog";

type UsersTabHeaderProps = {
  onChangeSearchValue: (value: string) => void;
};

export const UsersTabHeader = ({
  onChangeSearchValue,
}: UsersTabHeaderProps) => {
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  return (
    <Flex gap={"2"}>
      <TextField.Root
        onChange={(e) => onChangeSearchValue(e.target.value)}
        style={{ flex: 1 }}
        placeholder="Search by name..."
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <Button onClick={() => setAddUserDialogOpen(true)}>+ Add User</Button>
      <AddUserDialog
        open={addUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
      />
    </Flex>
  );
};
