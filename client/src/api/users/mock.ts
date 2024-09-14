import { faker } from "@faker-js/faker";
import { User } from "./types";

export const createUserMock = (part: Partial<User> = {}): User => {
  const createdAt = part.createdAt ?? faker.date.past().toISOString();
  const updatedAt =
    part.updatedAt ??
    faker.date.soon({ refDate: new Date(createdAt) }).toISOString();

  return {
    id: faker.string.uuid(),
    createdAt,
    updatedAt,
    first: faker.person.firstName(),
    last: faker.person.lastName(),
    roleId: faker.string.uuid(),
    photo: faker.helpers.maybe(faker.image.url),
  };
};
