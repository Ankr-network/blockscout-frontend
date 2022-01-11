import { AnyAction } from 'redux';

export const UPDATE_SUFFIX = '_UPDATE';

export function isUpdateAction(action: AnyAction) {
  return action.type.endsWith(UPDATE_SUFFIX);
}

export function getInitActionName(actionName: string) {
  return actionName.replace(new RegExp(`${UPDATE_SUFFIX}$`), '');
}
