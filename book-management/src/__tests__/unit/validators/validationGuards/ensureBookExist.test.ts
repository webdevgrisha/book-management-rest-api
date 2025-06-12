import { describe, it, expect } from 'vitest';
import { ensureBookExist } from '../../../../validators/validationGuards/index.js';
import { NotFoundError } from '../../../../errors/notFoundError/notFoundError.js';

describe('ensureBookExist', () => {
  it('does not throw if rowCount > 0', () => {
    expect(() => ensureBookExist(1, 123)).not.toThrow();
  });
  
  it('throws NotFoundError if rowCount is 0', () => {
    expect(() => ensureBookExist(0, 123)).toThrow(NotFoundError);
  });
});
