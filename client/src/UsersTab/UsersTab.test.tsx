import { faker } from "@faker-js/faker";
import { createRoleMock } from "../api/roles/mock";
import { createUserMock } from "../api/users/mock";
import { render, screen, waitFor } from "@testing-library/react";
import { UsersTab } from "./UsersTab";
import { getUserName } from "../api/users/utils";
import {
  createRoleListHandler,
  createRoleListResolver,
  createTestServer,
  createUserListHandler,
  createUserListResolver,
} from "../test/server";
import { withProviders } from "../test/decorators";
import { createPaginatedMock } from "../api/mock";

describe("UsersTab", () => {
  const roles = [
    createRoleMock({ isDefault: false }),
    createRoleMock({ isDefault: false }),
    createRoleMock({ isDefault: false }),
    createRoleMock({ isDefault: true }),
  ];

  const users = faker.helpers.multiple(
    () =>
      createUserMock({
        roleId: faker.helpers.arrayElement(roles).id,
      }),
    { count: 20 }
  );

  createTestServer(
    createRoleListHandler(
      createRoleListResolver(createPaginatedMock({ data: roles }))
    ),
    createUserListHandler(
      createUserListResolver(createPaginatedMock({ data: users }))
    )
  );

  it("should show a list of users", async () => {
    render(<UsersTab />, { wrapper: withProviders() });

    const userName = getUserName(users[0]);
    await waitFor(() =>
      expect(
        screen.getByText(userName, {
          collapseWhitespace: false,
        })
      ).toBeInTheDocument()
    );
  });
});
