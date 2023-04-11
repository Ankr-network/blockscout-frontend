import { AxiosError } from 'axios';
import { PermissionErrorResponse } from 'multirpc-sdk';
import { isAxiosError } from './isAxiosError';
import { isPermissionError } from './isPermissionError';

export const isAxiosPermissionError = (
  error: unknown,
): error is AxiosError<PermissionErrorResponse> =>
  isAxiosError<PermissionErrorResponse>(error) &&
  isPermissionError(error.response?.data);
