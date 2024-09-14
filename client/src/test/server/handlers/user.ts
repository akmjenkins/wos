import {
  DefaultBodyType,
  http,
  HttpResponse,
  HttpResponseResolver,
  PathParams,
} from "msw";
import { getUsersUrl, getUserUrl } from "../../../api/users/urls";
import { CreateUserParams } from "../../../api/users/useCreateUser";
import { User } from "../../../api/users/types";
import { PaginatedData } from "../../../api/types";
import { createPaginatedMock } from "../../../api/mock";
import { createUserMock } from "../../../api/users/mock";
import { UpdateUserParams } from "../../../api/users/useUpdateUser";

type CreateUserListResolver = HttpResponseResolver<
  PathParams,
  DefaultBodyType,
  PaginatedData<User>
>;

export const createUserListResolver =
  (
    result = createPaginatedMock({ data: [createUserMock()] })
  ): CreateUserListResolver =>
  () =>
    HttpResponse.json(result);

export const createUserListHandler = (resolver = createUserListResolver()) =>
  http.get(getUsersUrl(), resolver);

type CreateCreateUserResolver = HttpResponseResolver<
  PathParams,
  CreateUserParams,
  User
>;

export const createCreateUserResolver =
  (): CreateCreateUserResolver =>
  async ({ request }) =>
    HttpResponse.json(createUserMock(await request.json()));

export const createCreateUserHandler = (
  resolver = createCreateUserResolver()
) => http.post(getUserUrl(":id"), resolver);

type CreateUpdateUserResolver = HttpResponseResolver<
  { id: string },
  Omit<UpdateUserParams, "id">,
  User
>;

export const createUpdateUserResolver =
  (): CreateUpdateUserResolver =>
  async ({ request }) =>
    HttpResponse.json(createUserMock(await request.json()));

export const createUpdateUserHandler = (
  resolver = createUpdateUserResolver()
) => http.patch(getUserUrl(":id"), resolver);

type CreateDeleteUserResolver = HttpResponseResolver<
  { id: string },
  DefaultBodyType,
  User
>;

export const createDeleteUserResolver =
  (user = createUserMock()): CreateDeleteUserResolver =>
  () =>
    HttpResponse.json(user);

export const createDeleteUserHandler = (
  resolver = createDeleteUserResolver()
) => http.delete(getUserUrl(":id"), resolver);
