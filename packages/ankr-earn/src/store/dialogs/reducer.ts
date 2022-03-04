import { Action, handleActions } from 'redux-actions';

import {
  CLOSE_MODAL_ACTION,
  KnownModal,
  OPEN_MODAL_ACTION,
  RESET_STORE,
} from './actions';
import { IDialogState } from './selectors';

const NO_DIALOG_OPENED: IDialogState = {
  currentModal: undefined,
  context: undefined,
};

export const dialog = handleActions<
  IDialogState,
  { name: KnownModal; context: unknown }
>(
  {
    [OPEN_MODAL_ACTION]: (
      state,
      { payload }: Action<{ name: KnownModal; context: unknown }>,
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
