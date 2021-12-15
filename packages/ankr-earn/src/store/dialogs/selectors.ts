import { closeModalAction, KnownModal, openModalAction } from './actions';
import { IStoreState } from '../reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

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
