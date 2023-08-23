import { AccountErrorResponse } from 'multirpc-sdk';
import { AxiosError } from 'axios';

export const getAxiosAccountErrorCode = (
  axiosAccountError: AxiosError<AccountErrorResponse>,
) => axiosAccountError.response?.data.error.code ?? '';
