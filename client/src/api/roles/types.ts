export type Role = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  isDefault: boolean;
};

export type FetchRoleParams = {
  page: number;
};
