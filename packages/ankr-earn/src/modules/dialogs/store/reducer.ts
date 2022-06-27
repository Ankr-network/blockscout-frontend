import { Action, handleActions } from 'redux-actions';

import {
  CLOSE_MODAL_ACTION,
  EKnownDialogs,
  OPEN_MODAL_ACTION,
  RESET_STORE,
} from '../const';

export interface IDialogState {
  currentModal?: EKnownDialogs;
  context?: unknown;
}

const NO_DIALOG_OPENED: IDialogState = {
  currentModal: undefined,
  context: undefined,
};

export const dialog = handleActions<
  IDialogState,
  { name: EKnownDialogs; context: unknown }
>(
  {
    [OPEN_MODAL_ACTION]: (
      state,
      { payload }: Action<{ name: EKnownDialogs; context: unknown }>,
    ) => ({
      ...state,
      currentModal: payload.name,
      context: payload.context,
    }),
    [CLOSE_MODAL_ACTION]: state => ({
      ...state,
      ...NO_DIALOG_OPENED,
    }),
    [RESET_STORE]: state => ({ ...state, ...NO_DIALOG_OPENED }),
  },
  NO_DIALOG_OPENED,
);
