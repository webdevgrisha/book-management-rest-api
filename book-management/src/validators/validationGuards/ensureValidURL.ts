import validator from 'validator';
import { ValidationError } from '../../errors/validationError/validationError.js';

function ensureValidURL(value: string, fieldName: string): void {
  if (validator.isURL(value, { require_protocol: true })) return;

  throw new ValidationError(`${fieldName} must be a valid URL.`);
}

export { ensureValidURL };
