export type User = {
  id: string;
  createdAt: string;
  updatedAt: string;
  first: string;
  last: string;
  roleId: string;
  photo?: string;
};

export type FetchUserParams = {
  search?: string;
  page: number;
};
