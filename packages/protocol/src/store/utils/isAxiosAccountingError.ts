import { AccountingErrorResponse, isAccountingError } from 'multirpc-sdk';
import { AxiosError } from 'axios';

import { isAxiosError } from './isAxiosError';

export const isAxiosAccountingError = (
  error: unknown,
): error is AxiosError<AccountingErrorResponse> =>
  isAxiosError<AccountingErrorResponse>(error) &&
  isAccountingError(error.response?.data.error);
