import { queryClient } from "../queryClient";
import { PaginatedData } from "../types";
import { userKeys } from "./keys";
import { User } from "./types";

export const getUserName = (user: User) => `${user.first} ${user.last}`;

export const getUserInitials = (user: User) =>
  `${user.first[0]} ${user.last[0]}`;

export const removeUserFromCache = (userId: string, client = queryClient) => {
  client.setQueriesData<PaginatedData<User>>(
    { queryKey: userKeys.lists(), exact: false },
    (data) => {
      if (!data) return;

      const itemIndexInPage = data.data.findIndex((user) => user.id === userId);

      if (itemIndexInPage === -1) return data;

      return {
        ...data,
        data: data.data.filter((_, idx) => idx !== itemIndexInPage),
      };
    }
  );
};

export const updateUserInCache = (
  updater: (user: User) => User,
  client = queryClient
) => {
  client.setQueriesData<PaginatedData<User>>(
    { queryKey: userKeys.lists(), exact: false },
    (data) => {
      if (!data) return data;
      return {
        ...data,
        data: data.data.map(updater),
      };
    }
  );
};
