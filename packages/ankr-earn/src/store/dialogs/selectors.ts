import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { IStoreState } from '../store';

import { closeModalAction, KnownModal, openModalAction } from './actions';

export interface IDialogState {
  currentModal?: KnownModal;
  context?: unknown;
}

export interface IUseDiagolData<C> {
  isOpened: boolean;
  context: C;
  handleClose: () => void;
  handleOpen: () => void;
}

export function useDialog<T = unknown>(modalId: KnownModal): IUseDiagolData<T> {
  const dispatch = useDispatch();

  return {
    isOpened: useSelector(
      (state: IStoreState) => state.dialog.currentModal === modalId,
    ),
    context: useSelector((state: IStoreState) => state.dialog.context as T),
    handleClose: useCallback(() => dispatch(closeModalAction()), [dispatch]),
    handleOpen: () => dispatch(openModalAction(modalId)),
  };
}
