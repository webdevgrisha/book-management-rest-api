interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  currPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface TotalRowsCount {
  total: number;
}

export type { PaginationMeta, TotalRowsCount };
