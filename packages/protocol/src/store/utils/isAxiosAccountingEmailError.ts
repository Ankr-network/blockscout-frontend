import { isAccountingEmailError } from 'multirpc-sdk';

import { isAxiosAccountingError } from './isAxiosAccountingError';

export const isAxiosAccountEmailError = (error: unknown) =>
  isAxiosAccountingError(error) && isAccountingEmailError(error.response?.data);
