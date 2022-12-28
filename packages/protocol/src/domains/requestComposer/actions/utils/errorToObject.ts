export interface ObjectWithError {
  error: string;
}

export const errorToObject = (error: unknown): ObjectWithError | unknown =>
  typeof error === 'string' ? { error } : error;
