import { createAction } from './createAction';

export function createSuccessAction<T = any>(actionName: string, data?: T) {
  return createAction(`${actionName}_SUCCESS`, data);
}
