import { AnyAction, Action } from 'redux';

import { CLOSE_MODAL_ACTION, EKnownDialogs, OPEN_MODAL_ACTION } from '../const';

export const openModalAction = (
  name: EKnownDialogs,
  context?: unknown,
): AnyAction => ({
  type: OPEN_MODAL_ACTION,
  payload: { name, context },
});

export const closeModalAction = (): Action<string> => ({
  type: CLOSE_MODAL_ACTION,
});
