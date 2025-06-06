import { ValidationError } from '../../errors/validationError/validationError.js';
import { isLengthInRange } from '../validateFuncs/index.js';

function ensureLengthInRange(value: string, fieldName: string, min: number, max: number): void {
  if (isLengthInRange(value, min, max)) return;

  throw new ValidationError(`${fieldName} length must be between ${min} and ${max} characters.`);
}

export { ensureLengthInRange };
