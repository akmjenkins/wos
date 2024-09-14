import { faker } from "@faker-js/faker";
import { Role } from "./types";

export const createRoleMock = (part: Partial<Role> = {}): Role => {
  const createdAt = part.createdAt ?? faker.date.past().toISOString();
  const updatedAt =
    part.updatedAt ??
    faker.date.soon({ refDate: new Date(createdAt) }).toISOString();

  return {
    id: faker.string.uuid(),
    createdAt,
    updatedAt,
    name: faker.person.jobTitle(),
    description: faker.helpers.maybe(faker.person.jobDescriptor),
    isDefault: faker.datatype.boolean(),
  };
};
