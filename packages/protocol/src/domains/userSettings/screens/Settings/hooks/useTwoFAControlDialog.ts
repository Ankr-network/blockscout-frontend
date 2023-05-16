import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectIsTwoFADialogOpened,
  setTwoFACode,
  setIsTwoFADialogOpened,
} from 'domains/userSettings/store/userSettingsSlice';

export const useTwoFAControlDialog = () => {
  const dispatch = useDispatch();

  const isOpened = useAppSelector(selectIsTwoFADialogOpened);

  const handleOpen = useCallback(() => {
    dispatch(setIsTwoFADialogOpened(true));
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch(setIsTwoFADialogOpened(false));
  }, [dispatch]);

  const handleSetTwoFACode = useCallback(
    async (twoFACode: string) => {
      await dispatch(setTwoFACode(twoFACode));
    },
    [dispatch],
  );

  return {
    isOpened: Boolean(isOpened),
    handleOpen,
    handleClose,
    handleSetTwoFACode,
  };
};
