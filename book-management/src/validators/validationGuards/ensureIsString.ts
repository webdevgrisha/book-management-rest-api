import { ValidationError } from '../../errors/validationError/validationError.js';
import { isString } from '../validateFuncs/index.js';

function ensureIsString(value: unknown, fieldName: string): asserts value is string {
  if (isString(value)) return;

  throw new ValidationError(`${fieldName} need to be typeof string !`);
}

export { ensureIsString };
