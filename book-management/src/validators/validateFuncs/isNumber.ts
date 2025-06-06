function isNumber(value: unknown): boolean {
  return typeof value === 'number' && !Number.isNaN(value);
}

export { isNumber };
