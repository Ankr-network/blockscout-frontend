import { isAccountEmailError } from 'multirpc-sdk';

import { isAxiosAccountError } from './isAxiosAccountError';

export const isAxiosAccountEmailError = (error: unknown) =>
  isAxiosAccountError(error) && isAccountEmailError(error.response?.data);
