import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { AddRoleDialog } from "./AddRoleDialog";

type RolesTabHeaderProps = {
  onChangeSearchValue: (value: string) => void;
};

export const RolesTabHeader = ({
  onChangeSearchValue,
}: RolesTabHeaderProps) => {
  const [addRoleDialogOpen, setAddRoleDialogOpen] = useState(false);
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
      <Button onClick={() => setAddRoleDialogOpen(true)}>+ Add role</Button>
      <AddRoleDialog
        open={addRoleDialogOpen}
        onClose={() => setAddRoleDialogOpen(false)}
      />
    </Flex>
  );
};
