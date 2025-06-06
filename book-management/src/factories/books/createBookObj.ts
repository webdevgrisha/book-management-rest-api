import { ValidationError } from '../../errors/validationError/validationError.js';
import { BookCreateData } from '../../modules/books/book.types.js';
import { bookFieldsConfig } from '../../validators/books/bookFieldsConfig.js';
import { logger } from '../../utils/logger.js';

function createBookObj(bookInitObj: Record<string, unknown>): BookCreateData {
  const bookCreateData = {} as BookCreateData;

  try {
    for (const fieldConfig of bookFieldsConfig) {
      const fieldName: keyof BookCreateData = fieldConfig.name;
      const isFieldRequired: boolean = fieldConfig.isRequired;

      const initValue: unknown = bookInitObj[fieldName];
      const isFieldExist: boolean = fieldName in bookInitObj;

      if (isFieldRequired && !isFieldExist) {
        throw new ValidationError(`Miss required field ${fieldName}`);
      }

      if (isFieldRequired) {
        fieldConfig.validation(initValue);
      }

      if (!isFieldExist) continue;

      (bookCreateData as Record<keyof BookCreateData, unknown>)[fieldName] = initValue;
    }

    logger.info(`BookCreateData object created: ${JSON.stringify(bookCreateData)}`);

    return bookCreateData;
  } catch (err) {
    logger.error(
      `createBookObj failed: ${err}, input: ${JSON.stringify(bookInitObj)}`,
    );
    throw err;
  }
}

export { createBookObj };
