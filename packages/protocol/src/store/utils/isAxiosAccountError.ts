import { AccountErrorResponse, isAccountError } from 'multirpc-sdk';
import { AxiosError } from 'axios';

import { isAxiosError } from './isAxiosError';

export const isAxiosAccountError = (
  error: unknown,
): error is AxiosError<AccountErrorResponse> =>
  isAxiosError<AccountErrorResponse>(error) &&
  isAccountError(error.response?.data.error);
