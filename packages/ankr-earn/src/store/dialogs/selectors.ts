import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../store';
import { closeModalAction, KnownModal, openModalAction } from './actions';

export type IDialogState = {
  currentModal?: KnownModal;
  context?: any;
};

export function useDialog<T = any>(modalId: KnownModal) {
  const dispatch = useDispatch();
  return {
    isOpened: useSelector((state: IStoreState) => {
      return state.dialog.currentModal === modalId;
    }),
    context: useSelector((state: IStoreState) => {
      return state.dialog.context as T;
    }),
    handleClose: useCallback(() => {
      dispatch(closeModalAction());
    }, [dispatch]),
    handleOpen: () => dispatch(openModalAction(modalId)),
  };
}
