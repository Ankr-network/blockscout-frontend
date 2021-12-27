import { createAction } from './createAction';

export function createErrorAction(actionName: string, error: Error) {
  return createAction(`${actionName}_ERROR`, { error: error.toString() });
}
