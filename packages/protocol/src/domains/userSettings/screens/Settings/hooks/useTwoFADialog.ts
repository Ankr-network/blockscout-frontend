import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { t } from '@ankr.com/common';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';

import { useAppSelector } from 'store/useAppSelector';
import {
  selectIsTwoFADialogOpened,
  setTwoFACode,
  setIsTwoFADialogOpened,
  selectTwoFAErrorMessage,
  setTwoFAErrorMessage,
} from 'domains/userSettings/store/userSettingsSlice';
import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { oauthSignout } from 'domains/oauth/actions/signout';
import { OauthRoutesConfig } from 'domains/oauth/routes';

export const useTwoFADialog = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isOpened = useAppSelector(selectIsTwoFADialogOpened);
  const errorMessage = useAppSelector(selectTwoFAErrorMessage);

  const handleOpen = useCallback(() => {
    dispatch(setIsTwoFADialogOpened(true));
  }, [dispatch]);

  const handleSetTwoFACode = useCallback(
    (twoFACode: string) => dispatch(setTwoFACode(twoFACode)),
    [dispatch],
  );

  const handleResetErroMessage = useCallback(
    () => dispatch(setTwoFAErrorMessage('')),
    [dispatch],
  );

  const redirect = useCallback(() => {
    const shouldRedirectOnClose = pathname === OauthRoutesConfig.oauth.path;

    if (!shouldRedirectOnClose) return;

    dispatch(
      NotificationActions.showNotification({
        message: t('error.two-fa'),
        severity: 'error',
      }),
    );
    dispatch(oauthSignout.initiate());
    dispatch(push(ChainsRoutesConfig.chains.generatePath()));
  }, [dispatch, pathname]);

  const handleClose = useCallback(() => {
    dispatch(setIsTwoFADialogOpened(false));
    handleResetErroMessage();
    redirect();
  }, [dispatch, handleResetErroMessage, redirect]);

  return {
    isOpened: Boolean(isOpened),
    handleOpen,
    handleClose,
    handleSetTwoFACode,
    errorMessage,
    handleResetErroMessage,
  };
};
