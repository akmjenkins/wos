import { Section } from "@radix-ui/themes";
import { RolesTable } from "./RolesTable";
import { RolesTabHeader } from "./RolesTabHeader";

export const RolesTab = () => {
  return (
    <>
      <Section size={"1"}>
        <RolesTabHeader onChangeSearchValue={() => {}} />
      </Section>
      <Section size={"1"}>
        <RolesTable />
      </Section>
    </>
  );
};
