import { AccountingError, AccountingErrorCode } from '../types';

const codes = Object.values(AccountingErrorCode);

export const isAccountingError = (error: unknown): error is AccountingError =>
  !!error &&
  typeof error === 'object' &&
  'code' in error &&
  'message' in error &&
  codes.includes((error as AccountingError).code);
