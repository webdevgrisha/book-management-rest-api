import { describe, it, expect } from 'vitest';
import { createPaginationObj } from '../../../utils/createPaginationObj.js';

describe('createPaginationObj', () => {
  it('returns correct pagination meta for first page', () => {
    const result = createPaginationObj({ totalCount: 50, currPage: 1, limit: 10 });
    expect(result).toEqual({
      totalCount: 50,
      totalPages: 5,
      currPage: 1,
      limit: 10,
      hasNextPage: true,
      hasPrevPage: false,
    });
  });

  it('returns correct pagination meta for middle page', () => {
    const result = createPaginationObj({ totalCount: 50, currPage: 3, limit: 10 });
    expect(result).toEqual({
      totalCount: 50,
      totalPages: 5,
      currPage: 3,
      limit: 10,
      hasNextPage: true,
      hasPrevPage: true,
    });
  });

  it('returns correct pagination meta for last page', () => {
    const result = createPaginationObj({ totalCount: 50, currPage: 5, limit: 10 });
    expect(result).toEqual({
      totalCount: 50,
      totalPages: 5,
      currPage: 5,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: true,
    });
  });

  it('handles totalCount = 0', () => {
    const result = createPaginationObj({ totalCount: 0, currPage: 1, limit: 10 });
    expect(result).toEqual({
      totalCount: 0,
      totalPages: 0,
      currPage: 1,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });

  it('handles limit greater than totalCount', () => {
    const result = createPaginationObj({ totalCount: 5, currPage: 1, limit: 10 });
    expect(result).toEqual({
      totalCount: 5,
      totalPages: 1,
      currPage: 1,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });
});
