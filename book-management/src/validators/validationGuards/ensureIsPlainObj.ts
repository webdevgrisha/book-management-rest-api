import { ValidationError } from '../../errors/validationError/validationError.js';
import { isPlainObject } from '../validateFuncs/index.js';

function ensureIsPlainObj(value: unknown, fieldName: string): asserts value is object {
  if (isPlainObject(value)) return;

  throw new ValidationError(`${fieldName} need to be object type !`);
}

export { ensureIsPlainObj };
