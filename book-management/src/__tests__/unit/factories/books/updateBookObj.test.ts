import { describe, it, expect } from 'vitest';
import { updateBookObj } from '../../../../factories/books/updateBookObj.js';
import { ValidationError } from '../../../../errors/validationError/validationError.js';

describe('updateBookObj', () => {
  it('creates a valid BookUpdateData object with one field', () => {
    const input = { title: 'Updated Title' };
    const result = updateBookObj(input);
    expect(result).toEqual({ title: 'Updated Title' });
  });

  it('creates a valid BookUpdateData object with multiple fields', () => {
    const input = {
      title: 'Updated Title',
      author: 'Jane Doe',
      year: 2022,
      description: 'Updated description',
      coverImageUrl: 'https://example.com/cover.jpg',
    };
    const result = updateBookObj(input);
    expect(result).toEqual(input);
  });

  it('throws ValidationError if a field is invalid', () => {
    const input = { title: 'T' }; // too short
    expect(() => updateBookObj(input)).toThrow(ValidationError);
  });

  it('throws ValidationError if year is out of range', () => {
    const tooSmall = {
      year: -1,
      title: 'Valid Title',
      author: 'Valid Author',
    };
    const tooBig = {
      year: new Date().getFullYear() + 1,
      title: 'Valid Title',
      author: 'Valid Author',
    };
    expect(() => updateBookObj(tooSmall)).toThrow(ValidationError);
    expect(() => updateBookObj(tooBig)).toThrow(ValidationError);
  });

  it('throws ValidationError if coverImageUrl is invalid', () => {
    const input = {
      coverImageUrl: 'not-a-url',
      title: 'Valid Title',
      author: 'Valid Author',
      year: 2020,
    };
    expect(() => updateBookObj(input)).toThrow(ValidationError);
  });

  it('returns empty object if no updatable fields provided', () => {
    const input = { notAField: 'value' };
    const result = updateBookObj(input);
    expect(result).toEqual({});
  });
});
