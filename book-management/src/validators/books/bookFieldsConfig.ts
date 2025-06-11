import { BookCreateData } from '../../models/book.types.js';
import {
  ensureIsNumber,
  ensureIsString,
  ensureLengthInRange,
  ensureNumberInRange,
  ensureValidURL,
} from '../validationGuards/index.js';

type BookFieldName = keyof BookCreateData;

interface BookFieldsConfig {
  name: BookFieldName;
  isRequired: boolean;
  _min?: number;
  _max?: number;
  validation: (value: unknown) => void;
}

const bookFieldsConfig: BookFieldsConfig[] = [
  {
    name: 'title',
    isRequired: true,
    _min: 3,
    _max: 150,
    validation: function (value: unknown): void {
      ensureIsString(value, this.name);
      ensureLengthInRange(value, this.name, this._min!, this._max!);
    },
  },
  {
    name: 'author',
    isRequired: true,
    _min: 3,
    _max: 100,
    validation: function (value: unknown): void {
      ensureIsString(value, this.name);
      ensureLengthInRange(value, this.name, this._min!, this._max!);
    },
  },
  {
    name: 'description',
    isRequired: false,
    _min: 0,
    _max: 500,
    validation: function (value: unknown): void {
      ensureIsString(value, this.name);
      ensureLengthInRange(value, this.name, this._min!, this._max!);
    },
  },
  {
    name: 'year',
    isRequired: true,
    _min: 0,
    _max: new Date().getFullYear(),
    validation: function (value: unknown): void {
      ensureIsNumber(value, this.name);
      ensureNumberInRange(value, this.name, this._min!, this._max!);
    },
  },
  {
    name: 'coverImageUrl',
    isRequired: false,
    validation: function (value: unknown): void {
      ensureIsString(value, this.name);
      ensureValidURL(value, this.name);
    },
  },
];

export { bookFieldsConfig };
