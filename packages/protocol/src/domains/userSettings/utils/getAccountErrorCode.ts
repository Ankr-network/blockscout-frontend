import { isAxiosAccountError } from 'store/utils/isAxiosAccountError';

import { ErrorMessageGetter } from '../types';

export const getAccountErrorCode: ErrorMessageGetter = error =>
  (isAxiosAccountError(error) && error.response?.data.error.code) || '';
