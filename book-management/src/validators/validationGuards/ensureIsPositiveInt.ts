import { ValidationError } from '../../errors/validationError/validationError.js';
import { isInteger } from '../validateFuncs/index.js';
import { ensureIsNumber } from './index.js';

function ensureIsPositiveInt(value: unknown, fieldName: string): asserts value is number {
  ensureIsNumber(value, fieldName);

  if (isInteger(value) && value > 0) return;

  throw new ValidationError(`${fieldName} must be a positive number !`);
}

export { ensureIsPositiveInt };
