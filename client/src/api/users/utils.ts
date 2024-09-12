import { User } from "./types";

export const getUserName = (user: User) => `${user.first} ${user.last}`;

export const getUserInitials = (user: User) =>
  `${user.first[0]} ${user.last[0]}`;
