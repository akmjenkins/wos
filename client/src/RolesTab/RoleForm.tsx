import { Flex, Switch, TextField } from "@radix-ui/themes";
import { Controller } from "react-hook-form";
import { FormField } from "../components/FormField";
import { CreateRoleParams } from "../api/roles/useCreateRole";

export const RoleForm = () => {
  return (
    <Flex direction="column" gap="3">
      <Controller<CreateRoleParams>
        name="name"
        defaultValue={""}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <FormField label="Name" error={fieldState.error?.message}>
            <TextField.Root
              color={fieldState.error ? "red" : undefined}
              {...field}
              value={String(field.value)}
              data-1p-ignore
            />
          </FormField>
        )}
      />
      <Controller<CreateRoleParams>
        name="description"
        defaultValue={""}
        render={({ field, fieldState }) => (
          <FormField label="Description" error={fieldState.error?.message}>
            <TextField.Root
              color={fieldState.error ? "red" : undefined}
              {...field}
              value={String(field.value)}
              data-1p-ignore
            />
          </FormField>
        )}
      />

      <Controller<CreateRoleParams>
        name="isDefault"
        render={({ field: { onBlur, ref, onChange, value }, fieldState }) => (
          <FormField label="Default" error={fieldState.error?.message}>
            <Switch
              color={fieldState.error ? "red" : undefined}
              onBlur={onBlur}
              ref={ref}
              onCheckedChange={(e) => onChange(e)}
              checked={!!value}
            />
          </FormField>
        )}
      />
    </Flex>
  );
};
