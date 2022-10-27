export const trim = (input: unknown = '') =>
  typeof input === 'string' ? input.trim() : input;
