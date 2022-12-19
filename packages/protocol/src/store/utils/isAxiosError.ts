import { AxiosError } from 'axios';

export const isAxiosError = <ErrorData = any>(
  error: unknown,
): error is AxiosError<ErrorData> =>
  !!error &&
  typeof error === 'object' &&
  'isAxiosError' in error &&
  (error as AxiosError).isAxiosError;
