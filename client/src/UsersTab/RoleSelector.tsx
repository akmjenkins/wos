import { Select, TextField } from "@radix-ui/themes";
import { forwardRef } from "react";
import { useFetchAllRoles } from "../api/roles/useFetchAllRoles";

type RoleSelectorProps = Select.TriggerProps &
  Pick<Select.RootProps, "value" | "onValueChange">;

export const RoleSelector = forwardRef<HTMLButtonElement, RoleSelectorProps>(
  ({ value, onValueChange, ...rest }, ref) => {
    const { data, isError, isPending, refetch } = useFetchAllRoles();

    if (isError)
      return (
        <TextField.Root
          readOnly
          onClick={() => refetch()}
          placeholder="Failed to retrieve roles. Click to refetch"
        />
      );

    return (
      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          {...rest}
          ref={ref}
          style={{ width: "100%" }}
          disabled={isPending}
          placeholder={isPending ? "Fetching Roles..." : "Choose a role"}
        ></Select.Trigger>
        <Select.Content>
          {data?.map((role) => (
            <Select.Item key={role.id} value={role.id}>
              {role.name} {role.isDefault ? <>(Default)</> : ""}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    );
  }
);
