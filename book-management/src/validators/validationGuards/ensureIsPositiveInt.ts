import { ValidationError } from '../../errors/validationError/validationError.js';
import { isInteger } from '../validateFuncs/isInteger.js';
import { ensureIsNumber } from './ensureIsNumber.js';

function ensureIsPositiveInt(value: unknown, fieldName: string): void {
  ensureIsNumber(value, fieldName);

  if (isInteger(value) && (value as number) > 0) return;

  throw new ValidationError(`${fieldName} must be a positive number !`);
}

export { ensureIsPositiveInt };
