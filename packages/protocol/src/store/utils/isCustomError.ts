import { CustomError } from 'errors/CustomError';
import { CustomErrorCode } from 'errors/const';

export const isCustomError = <Data = unknown>(
  error: unknown,
): error is CustomError<Data> =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  Object.values(CustomErrorCode).includes(error.code as CustomErrorCode);
