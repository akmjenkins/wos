export type PaginatedData<T> = {
  data: T[];
  next: number | null;
  prev: number | null;
  pages: number;
};
