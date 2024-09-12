import { Flex, TextField } from "@radix-ui/themes";
import { Controller } from "react-hook-form";
import { RoleSelector } from "./RoleSelector";
import { CreateUserParams } from "../api/users/useCreateUser";
import { FormField } from "../components/FormField";

export const UserForm = () => {
  return (
    <Flex direction="column" gap="3">
      <Controller<CreateUserParams>
        name="first"
        defaultValue={""}
        rules={{ required: "First name is required" }}
        render={({ field, fieldState }) => (
          <FormField label="First name" error={fieldState.error?.message}>
            <TextField.Root
              color={fieldState.error ? "red" : undefined}
              {...field}
              data-1p-ignore
            />
          </FormField>
        )}
      />
      <Controller<CreateUserParams>
        name="last"
        defaultValue={""}
        rules={{ required: "Last name is required" }}
        render={({ field, fieldState }) => (
          <FormField label="Last name" error={fieldState.error?.message}>
            <TextField.Root
              color={fieldState.error ? "red" : undefined}
              {...field}
              data-1p-ignore
            />
          </FormField>
        )}
      />

      <Controller<CreateUserParams>
        name="roleId"
        defaultValue={""}
        rules={{ required: "Role is required" }}
        render={({ field, fieldState }) => (
          <FormField label="Role" error={fieldState.error?.message}>
            <RoleSelector
              {...field}
              onValueChange={field.onChange}
              color={fieldState.error ? "red" : undefined}
            />
          </FormField>
        )}
      />
    </Flex>
  );
};
