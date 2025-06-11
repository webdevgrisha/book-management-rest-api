import { ValidationError } from '../../errors/validationError/validationError.js';
import { isNumber } from '../validateFuncs/index.js';

function ensureIsNumber(value: unknown, fieldName: string): asserts value is number {
  if (isNumber(value)) return;

  throw new ValidationError(`${fieldName} need to be typeof number !`);
}

export { ensureIsNumber };
