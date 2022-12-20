import { AnyAction, isRejected } from '@reduxjs/toolkit';
import { UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';

import {
  TOKEN_AUTH_ERROR,
  TOKEN_EXPIRED_ERROR,
  TOKEN_MALFORMED_ERROR,
} from 'store/const';

export const isAuthRejectedAction = (
  action: AnyAction,
): action is UnknownAsyncThunkRejectedAction =>
  isRejected(action) &&
  (action.error === (TOKEN_EXPIRED_ERROR as string) ||
    action.error === (TOKEN_AUTH_ERROR as string) ||
    action.error === (TOKEN_MALFORMED_ERROR as string));
