import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <Text size={"1"} color={"red"}>
    {children}
  </Text>
);

type FormFieldProps = {
  children: React.ReactNode;
  error?: string;
  label: string;
};

export const FormField = ({ children, error, label }: FormFieldProps) => {
  return (
    <label>
      <Text
        color={error ? "red" : undefined}
        as="div"
        size="2"
        mb="1"
        weight="bold"
      >
        {label}
      </Text>
      {children}
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
    </label>
  );
};
