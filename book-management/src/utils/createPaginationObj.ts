import { PaginationMeta } from "types/pagination.types.js";

interface CreatePaginationObjProps {
  totalCount: number;
  currPage: number;
  limit: number;
}

function createPaginationObj(paginationProps: CreatePaginationObjProps): PaginationMeta {
  const { totalCount, currPage, limit } = paginationProps;

  const totalPages: number = Math.ceil(totalCount / limit);
  const hasNextPage: boolean = currPage < totalPages;
  const hasPrevPage: boolean = currPage > 1;

  const paginationMeta: PaginationMeta = {
    totalCount,
    totalPages,
    currPage,
    limit,
    hasNextPage,
    hasPrevPage,
  };

  return paginationMeta;
}

export { createPaginationObj };
