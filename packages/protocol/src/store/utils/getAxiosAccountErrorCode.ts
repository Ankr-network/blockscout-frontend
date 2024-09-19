import { AccountingErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

export const getAxiosAccountErrorCode = (
  axiosAccountError: AxiosError<AccountingErrorResponse>,
) => axiosAccountError.response?.data.error.code || '';
