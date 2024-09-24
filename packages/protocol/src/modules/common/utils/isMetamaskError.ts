import { EMetamaskErrorCode, IMetamaskError } from '../types';

export const isMetamaskError = (error: unknown): error is IMetamaskError =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  typeof error.code === 'number' &&
  Object.values(EMetamaskErrorCode).includes(error.code) &&
  'message' in error;
