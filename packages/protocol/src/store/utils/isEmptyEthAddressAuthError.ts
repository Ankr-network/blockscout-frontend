import { AccountingErrorCode, AccountingErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

import { isAxiosAccountingError } from './isAxiosAccountingError';

export const isEmptyEthAddressAuthError = (
  error: unknown,
): error is AxiosError<AccountingErrorResponse> => {
  if (!isAxiosAccountingError(error)) {
    return false;
  }

  const errorCode = error?.response?.data?.error?.code;

  return errorCode === AccountingErrorCode.FailedPrecondition;
};
