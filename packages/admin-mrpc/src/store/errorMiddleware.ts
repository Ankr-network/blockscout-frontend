import { toast } from 'react-toastify';
import type { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

/**
 * Log a warning and show a toast!
 */

const conditionError = 'ConditionError';
export const queryErrorLogger: Middleware = () => next => action => {
  if (action.error && action.error.name !== conditionError) {
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
