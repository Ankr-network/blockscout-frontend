import { toast } from 'react-toastify';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */

const AUTH_ERROR = 'Request failed with status code 401';
const conditionError = 'ConditionError';

export const queryErrorLogger: Middleware = () => next => action => {
  if (action.error && action.error.name !== conditionError) {
    if (action.error.message === AUTH_ERROR) {
      toast.error('Try to relogin and check vpn connection', {
        toastId: action.error.message,
      });
    }
    toast.error(action.error.message, {
      toastId: action.error.message,
    });
  }
  if (isRejectedWithValue(action)) {
    toast.error(action.error.message, {
      toastId: action.error.message,
    });
  }

  return next(action);
};
