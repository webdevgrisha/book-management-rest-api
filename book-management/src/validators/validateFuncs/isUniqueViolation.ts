function isUniqueViolation(err: unknown): boolean {
  return (err as { code: string })?.code === '23505';
}

export { isUniqueViolation };
