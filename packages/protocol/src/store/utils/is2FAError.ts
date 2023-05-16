import { AccountErrorCode, AccountErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

import { isAxiosAccountError } from './isAxiosAccountError';

export const is2FAError = (
  error: unknown,
): error is AxiosError<AccountErrorResponse> => {
  if (!isAxiosAccountError(error)) {
    return false;
  }

  const errorCode = error?.response?.data?.error?.code;

  return (
    errorCode === AccountErrorCode.TwoFARequired ||
    errorCode === AccountErrorCode.TwoFAWrong
  );
};
