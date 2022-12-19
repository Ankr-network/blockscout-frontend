import { AccountError, AccountErrorCode } from '../types';

const codes = Object.values(AccountErrorCode);

export const isAccountError = (error: unknown): error is AccountError => !!error
  && typeof error === 'object'
  && 'code' in error
  && 'message' in error
  && codes.includes((error as AccountError).code);
