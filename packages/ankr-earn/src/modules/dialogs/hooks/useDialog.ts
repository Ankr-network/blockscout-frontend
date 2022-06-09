import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from 'store/useAppSelector';

import { EKnownDialogs } from '../const';
import { closeModalAction, openModalAction } from '../store/actions';

export interface IUseDiagolData<C> {
  isOpened: boolean;
  context: C;
  handleClose: () => void;
  handleOpen: () => void;
}

export function useDialog<T = unknown>(
  modalId: EKnownDialogs,
): IUseDiagolData<T> {
  const dispatch = useDispatch();

  const isOpened = useAppSelector(
    state => state.dialog.currentModal === modalId,
  );

  const context = useAppSelector(state => state.dialog.context as T);

  const handleClose = useCallback(
    () => dispatch(closeModalAction()),
    [dispatch],
  );

  const handleOpen = useCallback(
    () => dispatch(openModalAction(modalId)),
    [dispatch, modalId],
  );

  return {
    isOpened,
    context,
    handleClose,
    handleOpen,
  };
}
