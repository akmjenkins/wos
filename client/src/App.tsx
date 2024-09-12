import { Box, Container, Tabs } from "@radix-ui/themes";
import { UsersTab } from "./UsersTab/UsersTab";
import { RolesTab } from "./RolesTab/RolesTab";
import { useFetchAllRoles } from "./api/roles/useFetchAllRoles";

function App() {
  useFetchAllRoles();
  return (
    <Container minHeight={"100vh"}>
      <Tabs.Root defaultValue="users">
        <Tabs.List>
          <Tabs.Trigger value="users">Users</Tabs.Trigger>
          <Tabs.Trigger value="roles">Roles</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="users">
            <UsersTab />
          </Tabs.Content>

          <Tabs.Content value="roles">
            <RolesTab />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
}

export default App;
