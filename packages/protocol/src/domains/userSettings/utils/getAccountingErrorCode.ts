import { isAxiosAccountingError } from 'store/utils/isAxiosAccountingError';

import { ErrorMessageGetter } from '../types';

export const getAccountingErrorCode: ErrorMessageGetter = error =>
  (isAxiosAccountingError(error) && error.response?.data.error.code) || '';
