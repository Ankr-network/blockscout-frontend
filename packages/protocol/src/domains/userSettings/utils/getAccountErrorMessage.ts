import { ErrorMessageGetter } from '../types';

export const getAccountErrorMessage: ErrorMessageGetter = error =>
  error.response?.data.error.message || '';
