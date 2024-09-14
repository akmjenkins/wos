import type { PaginatedData } from "./types";

export const createPaginatedMock = <T>(
  part: Partial<PaginatedData<T>> = {}
): PaginatedData<T> => ({
  data: [],
  next: null,
  prev: null,
  pages: 1,
  ...part,
});
