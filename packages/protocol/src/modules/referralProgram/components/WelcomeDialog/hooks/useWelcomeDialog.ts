import { useCallback, useMemo } from 'react';

import { NotificationActions } from 'domains/notification/store/NotificationActions';
import { blockchainNamesMap } from 'modules/referralProgram/const';
import { getReferralCode } from 'modules/referralProgram/utils/getReferralCode';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { referralProgramTranslation } from 'modules/referralProgram/translation';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useAppDispatch } from 'store/useAppDispatch';
import { useApplyReferralCodeMutation } from 'modules/referralProgram/actions/applyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { IWelcomeDialogProps } from '../WelcomeDialog';

export interface IUseWelcomeDialogProps {
  handleSignInDialogOpen: () => void;
}

const { showNotification } = NotificationActions;

export const useWelcomeDialog = ({
  handleSignInDialogOpen,
}: IUseWelcomeDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleWelcomeDialogOpen,
  } = useDialog();

  const { referralCode: referralCodeFromUrl } = getReferralCode();

  const { handleRemoveSavedReferralCode, savedReferralCode } =
    useSavedReferralCode();

  const referralCode = referralCodeFromUrl || savedReferralCode;
  const blockchainName = referralCode
    ? blockchainNamesMap[referralCode]
    : undefined;

  const { keys, t } = useTranslation(referralProgramTranslation);

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();

    dispatch(
      showNotification({
        message: t(keys.activationRejectedErrorMessage),
        severity: 'error',
        title: t(keys.activationRejectedErrorTitle, { blockchainName }),
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

  const [applyReferralCode, { isLoading: isActivating }] =
    useApplyReferralCodeMutation();

  const onActivateButtonClick = useCallback(async () => {
    if (referralCode) {
      const response = await applyReferralCode({ code: referralCode });

      if (isMutationSuccessful(response)) {
        dispatch(
          showNotification({
            message: t(keys.activationAcceptedMessage, { blockchainName }),
            severity: 'success',
            title: t(keys.activationAcceptedTitle, { blockchainName }),
          }),
        );
      }

      removeReferralCodeFromUrl();
      handleRemoveSavedReferralCode();

      handleClose();
    }
  }, [
    applyReferralCode,
    blockchainName,
    dispatch,
    handleClose,
    handleRemoveSavedReferralCode,
    keys,
    referralCode,
    t,
  ]);

  const welcomeDialogProps = useMemo(
    (): IWelcomeDialogProps => ({
      blockchainName,
      hasActivateButton: isLoggedIn,
      isActivating,
      onActivateButtonClick,
      onClose,
      onSignInButtonClick,
      open: isOpened,
      referralCode,
    }),
    [
      blockchainName,
      isActivating,
      isLoggedIn,
      isOpened,
      onActivateButtonClick,
      onClose,
      onSignInButtonClick,
      referralCode,
    ],
  );

  return { handleWelcomeDialogOpen, welcomeDialogProps };
};
