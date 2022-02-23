import { Action } from 'redux-actions';

import { createAction } from './createAction';

export function createErrorAction(
  actionName: string,
  error: Error,
): Action<{ error: string }> {
  return createAction(`${actionName}_ERROR`, {
    error: error.toString(),
  }) as Action<{ error: string }>;
}
