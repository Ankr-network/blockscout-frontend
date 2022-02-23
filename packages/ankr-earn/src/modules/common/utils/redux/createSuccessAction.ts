import { Action } from 'redux-actions';

import { createAction } from './createAction';

export function createSuccessAction<T = unknown>(
  actionName: string,
  data?: T,
): Action<T> {
  return createAction(`${actionName}_SUCCESS`, data) as Action<T>;
}
