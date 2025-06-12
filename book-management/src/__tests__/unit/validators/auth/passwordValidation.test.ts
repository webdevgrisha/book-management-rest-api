import { describe, it, expect } from 'vitest';
import { isPassword } from '../../../../validators/auth/passwordValidation.js';

describe('isPassword', () => {
  it('should return true for a valid strong password', () => {
    expect(isPassword('StrongPassw0rd!')).toBe(true);
    expect(isPassword('Qwerty123!')).toBe(true);
    expect(isPassword('Abcdef1@')).toBe(true);
    expect(isPassword('A1b2c3d4!')).toBe(true);
  });

  it('should return false for passwords shorter than 8 characters', () => {
    expect(isPassword('A1bA1b!')).toBe(false);
  });

  it('should return false for passwords without uppercase letters', () => {
    expect(isPassword('strongpassw0rd!')).toBe(false);
  });

  it('should return false for passwords without lowercase letters', () => {
    expect(isPassword('STRONGPASSW0RD!')).toBe(false);
  });

  it('should return false for passwords without digits', () => {
    expect(isPassword('StrongPassword!')).toBe(false);
  });

  it('should return false for passwords without special characters', () => {
    expect(isPassword('StrongPassw0rd')).toBe(false);
  });
});
