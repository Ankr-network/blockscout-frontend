export const getUnknownErrorMessage = (error: unknown): string =>
  error ? (error as any).toString() : '';
