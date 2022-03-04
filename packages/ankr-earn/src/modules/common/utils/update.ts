import { AnyAction } from 'redux';

export const UPDATE_SUFFIX = '_UPDATE';

export function isUpdateAction(action: AnyAction): boolean {
  return action.type.endsWith(UPDATE_SUFFIX);
}

export function getInitActionName(actionName: string): string {
  return actionName.replace(new RegExp(`${UPDATE_SUFFIX}$`), '');
}
