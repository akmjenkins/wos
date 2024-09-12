import { Container, Section, Tabs } from "@radix-ui/themes";
import { UsersTab } from "./UsersTab/UsersTab";
import { RolesTab } from "./RolesTab/RolesTab";
import { useFetchAllRoles } from "./api/roles/useFetchAllRoles";

function App() {
  // warm the roles cache, not required, but good for UX
  useFetchAllRoles();

  return (
    <Container>
      <Tabs.Root defaultValue={"users"}>
        <Tabs.List>
          <Tabs.Trigger value="users">Users</Tabs.Trigger>
          <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
        </Tabs.List>

        <Section size={"1"}>
          <Tabs.Content value="users">
            <UsersTab />
          </Tabs.Content>

          <Tabs.Content value="roles">
            <RolesTab />
          </Tabs.Content>
        </Section>
      </Tabs.Root>
    </Container>
  );
}

export default App;
