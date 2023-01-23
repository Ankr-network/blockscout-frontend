import { AnyAction, isRejected } from '@reduxjs/toolkit';
import { UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';

import { isAuthError } from 'store/utils/isAuthError';
import { isAxiosAuthError } from 'store/utils/isAxiosAuthError';

export const isAuthRejectedAction = (
  action: AnyAction,
): action is UnknownAsyncThunkRejectedAction =>
  (isRejected(action) && isAuthError(action.error)) ||
  isAxiosAuthError(action.payload);
