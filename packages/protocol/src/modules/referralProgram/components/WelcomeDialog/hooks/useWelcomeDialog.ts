import { useCallback, useMemo } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useApplyReferralCode } from 'modules/referralProgram/hooks/useApplyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { IWelcomeDialogProps } from '../WelcomeDialog';

export interface IUseWelcomeDialogProps {
  banner: string | undefined;
  blockchainName: string | undefined;
  handleSignInDialogOpen: () => void;
  handleSuccessDialogOpen: () => void;
}

const { showNotification } = NotificationActions;

export const useWelcomeDialog = ({
  banner,
  blockchainName,
  handleSignInDialogOpen,
  handleSuccessDialogOpen,
}: IUseWelcomeDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleWelcomeDialogOpen,
  } = useDialog();

  const { referralCode } = useReferralCode();

  const { handleRemoveSavedReferralCode } = useSavedReferralCode();

  const {
    keys: { branded, unbranded },
    t,
  } = useTranslation(referralProgramTranslation);

  const keys = blockchainName ? branded : unbranded;

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();

    dispatch(
      showNotification({
        message: t(keys.activationRejectedErrorMessage),
        severity: 'error',
        title: t(keys.activationRejectedErrorTitle, {
          blockchainName,
          isBranded: Boolean(blockchainName),
        }),
      }),
    );
  }, [
    blockchainName,
    dispatch,
    handleClose,
    handleRemoveSavedReferralCode,
    keys,
    t,
  ]);

  const onSignInButtonClick = useCallback(() => {
    handleSignInDialogOpen();

    handleClose();
  }, [handleClose, handleSignInDialogOpen]);

  const { isLoggedIn } = useAuth();

  const onSuccess = useCallback(() => {
    handleClose();
    handleSuccessDialogOpen();
  }, [handleClose, handleSuccessDialogOpen]);

  const {
    handleApplyReferralCode: onActivateButtonClick,
    isApplying: isActivating,
  } = useApplyReferralCode({
    hasSuccessNotification: false,
    referralCode,
    onSuccess,
    onError: handleClose,
  });

  const welcomeDialogProps = useMemo(
    (): IWelcomeDialogProps => ({
      banner,
      blockchainName,
      hasActivateButton: isLoggedIn,
      isActivating,
      onActivateButtonClick,
      onClose,
      onSignInButtonClick,
      open: isOpened,
    }),
    [
      banner,
      blockchainName,
      isActivating,
      isLoggedIn,
      isOpened,
      onActivateButtonClick,
      onClose,
      onSignInButtonClick,
    ],
  );

  return { handleWelcomeDialogOpen, welcomeDialogProps };
};
