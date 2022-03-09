import { Action } from 'redux-actions';

export function createAction<T extends string, P>(
  type: T,
  payload?: P,
): Action<P | undefined> {
  return { type, payload };
}
