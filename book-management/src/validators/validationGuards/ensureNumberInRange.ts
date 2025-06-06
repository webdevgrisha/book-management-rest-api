import { ValidationError } from '../../errors/validationError/validationError.js';
import { isNumberInRange } from '../validateFuncs/index.js';

function ensureNumberInRange(value: number, fieldName: string, min: number, max: number): void {
  if (isNumberInRange(value, min, max)) return;

  throw new ValidationError(`${fieldName} must be between ${min} and ${max}.`);
}

export { ensureNumberInRange };
