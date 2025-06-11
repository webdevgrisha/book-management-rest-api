import { BookCreateData, BookUpdateData } from '../../models/book.types.js';
import { bookFieldsConfig } from '../../validators/books/bookFieldsConfig.js';
import { logger } from '../../utils/logger.js';

function updateBookObj(bookInitObj: Record<string, unknown>): BookUpdateData {
  const bookUpdateData = {} as BookUpdateData;

  try {
    for (const fieldConfig of bookFieldsConfig) {
      const fieldName: keyof BookCreateData = fieldConfig.name;

      const initValue: unknown = bookInitObj[fieldName];
      const isFieldExist: boolean = fieldName in bookInitObj;

      if (!isFieldExist) continue;

      fieldConfig.validation(initValue);

      (bookUpdateData as Record<keyof BookUpdateData, unknown>)[fieldName] = initValue;
    }

    logger.info(`BookUpdateData object created: ${JSON.stringify(bookUpdateData)}`);

    return bookUpdateData;
  } catch (err) {
    logger.error(`updateBookObj failed: ${err}, input: ${JSON.stringify(bookInitObj)}`);
    throw err;
  }
}

export { updateBookObj };
