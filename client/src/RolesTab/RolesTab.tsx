import { Section } from "@radix-ui/themes";
import { RolesTable } from "./RolesTable";
import { RolesTabHeader } from "./RolesTabHeader";
import { useState } from "react";

export const RolesTab = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <>
      <RolesTabHeader onChangeSearchValue={setFilter} />
      <Section size={"1"}>
        <RolesTable filter={filter} />
      </Section>
    </>
  );
};
