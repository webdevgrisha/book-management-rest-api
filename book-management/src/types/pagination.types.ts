interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  currPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type { PaginationMeta };
