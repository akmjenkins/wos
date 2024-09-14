import {
  DefaultBodyType,
  http,
  HttpResponse,
  HttpResponseResolver,
  PathParams,
} from "msw";

import { PaginatedData } from "../../../api/types";
import { createPaginatedMock } from "../../../api/mock";
import { createRoleMock } from "../../../api/roles/mock";
import { CreateRoleParams } from "../../../api/roles/useCreateRole";
import { Role } from "../../../api/roles/types";
import { UpdateRoleParams } from "../../../api/roles/useUpdateRole";
import { getRolesUrl, getRoleUrl } from "../../../api/roles/urls";

type CreateRoleListResolver = HttpResponseResolver<
  PathParams,
  DefaultBodyType,
  PaginatedData<Role>
>;

export const createRoleListResolver =
  (
    result = createPaginatedMock({ data: [createRoleMock()] })
  ): CreateRoleListResolver =>
  () =>
    HttpResponse.json(result);

export const createRoleListHandler = (resolver = createRoleListResolver()) =>
  http.get(getRolesUrl(), resolver);

type CreateCreateRoleResolver = HttpResponseResolver<
  PathParams,
  CreateRoleParams,
  Role
>;

export const createCreateRoleResolver =
  (): CreateCreateRoleResolver =>
  async ({ request }) =>
    HttpResponse.json(createRoleMock(await request.json()));

export const createCreateRoleHandler = (
  resolver = createCreateRoleResolver()
) => http.post(getRoleUrl(":id"), resolver);

type CreateUpdateRoleResolver = HttpResponseResolver<
  { id: string },
  Omit<UpdateRoleParams, "id">,
  Role
>;

export const createUpdateRoleResolver =
  (): CreateUpdateRoleResolver =>
  async ({ request }) =>
    HttpResponse.json(createRoleMock(await request.json()));

export const createUpdateRoleHandler = (
  resolver = createUpdateRoleResolver()
) => http.patch(getRoleUrl(":id"), resolver);

type CreateDeleteRoleResolver = HttpResponseResolver<
  { id: string },
  DefaultBodyType,
  Role
>;

export const createDeleteRoleResolver =
  (role = createRoleMock()): CreateDeleteRoleResolver =>
  () =>
    HttpResponse.json(role);

export const createDeleteRoleHandler = (
  resolver = createDeleteRoleResolver()
) => http.delete(getRoleUrl(":id"), resolver);
