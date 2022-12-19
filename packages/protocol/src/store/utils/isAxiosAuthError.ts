import { AxiosError } from 'axios';

import { AuthError, isAuthError } from './isAuthError';
import { isAxiosError } from './isAxiosError';

export const isAxiosAuthError = (
  error: unknown,
): error is AxiosError<AuthError> =>
  isAxiosError<AuthError>(error) && isAuthError(error.response?.data);
