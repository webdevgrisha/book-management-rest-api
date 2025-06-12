import { describe, it, expect } from 'vitest';
import { createBookObj } from '../../../../factories/books/createBookObj.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('createBookObj', () => {
  it('creates a valid BookCreateData object with all fields', () => {
    const input = {
      title: 'Test Book',
      author: 'John Doe',
      year: 2020,
      description: 'A test book',
      coverImageUrl: 'https://example.com/cover.jpg',
    };
    const result = createBookObj(input);
    expect(result).toEqual(input);
  });

  it('creates a valid BookCreateData object with only required fields', () => {
    const input = {
      title: 'Test Book',
      author: 'John Doe',
      year: 2020,
    };
    const result = createBookObj(input);
    expect(result).toEqual(input);
  });

  it('throws ValidationError if required field is missing', () => {
    const input = {
      title: 'Test Book',
      year: 2020,
    };
    expect(() => createBookObj(input)).toThrow(ValidationError);
  });

  it('throws ValidationError if a field is invalid', () => {
    const input = {
      title: 'T', // too short
      author: 'John Doe',
      year: 2020,
    };
    expect(() => createBookObj(input)).toThrow(ValidationError);
  });

  it('throws ValidationError if title is too short or too long', () => {
    const tooShort = {
      title: 'AB',
      author: 'John Doe',
      year: 2020,
    };
    const tooLong = {
      title: 'A'.repeat(151),
      author: 'John Doe',
      year: 2020,
    };
    expect(() => createBookObj(tooShort)).toThrow(ValidationError);
    expect(() => createBookObj(tooLong)).toThrow(ValidationError);
  });

  it('throws ValidationError if author is too short or too long', () => {
    const tooShort = {
      title: 'Test Book',
      author: 'AB',
      year: 2020,
    };
    const tooLong = {
      title: 'Test Book',
      author: 'A'.repeat(101),
      year: 2020,
    };
    expect(() => createBookObj(tooShort)).toThrow(ValidationError);
    expect(() => createBookObj(tooLong)).toThrow(ValidationError);
  });

  it('throws ValidationError if description is too long', () => {
    const tooLong = {
      title: 'Test Book',
      author: 'John Doe',
      year: 2020,
      description: 'A'.repeat(501),
    };
    expect(() => createBookObj(tooLong)).toThrow(ValidationError);
  });

  it('throws ValidationError if year is out of range', () => {
    const tooSmall = {
      title: 'Test Book',
      author: 'John Doe',
      year: -1,
    };
    const tooBig = {
      title: 'Test Book',
      author: 'John Doe',
      year: new Date().getFullYear() + 1,
    };
    expect(() => createBookObj(tooSmall)).toThrow(ValidationError);
    expect(() => createBookObj(tooBig)).toThrow(ValidationError);
  });

  it('throws ValidationError if coverImageUrl is invalid', () => {
    const notAUrl = {
      title: 'Test Book',
      author: 'John Doe',
      year: 2020,
      coverImageUrl: 'not-a-url',
    };
    expect(() => createBookObj(notAUrl)).toThrow(ValidationError);
  });
});
