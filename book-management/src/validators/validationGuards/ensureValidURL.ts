import validator from 'validator';
import { ValidationError } from '../../errors/validationError/validationError.js';

function ensureValidURL(value: string, fieldName: string): void {
  if (validator.isURL(value)) return;

  throw new ValidationError(`${fieldName}  must be between valid url.`);
}

export { ensureValidURL };
