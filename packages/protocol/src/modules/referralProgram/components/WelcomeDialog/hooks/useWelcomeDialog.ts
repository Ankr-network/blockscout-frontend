import { useCallback, useMemo } from 'react';

import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { removeReferralCodeFromUrl } from 'modules/referralProgram/utils/removeReferralCodeFromUrl';
import { useApplyReferralCodeMutation } from 'modules/referralProgram/actions/applyReferralCode';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import { useReferralCode } from 'modules/referralProgram/hooks/useReferralCode';
import { useSavedReferralCode } from 'modules/referralProgram/hooks/useSavedReferralCode';

import { IWelcomeDialogProps } from '../WelcomeDialog';

export interface IUseWelcomeDialogProps {
  handleSignInDialogOpen: () => void;
  handleSuccessDialogOpen: () => void;
}

export const useWelcomeDialog = ({
  handleSignInDialogOpen,
  handleSuccessDialogOpen,
}: IUseWelcomeDialogProps) => {
  const {
    isOpened,
    onClose: handleClose,
    onOpen: handleWelcomeDialogOpen,
  } = useDialog();

  const { handleRemoveSavedReferralCode, savedReferralCode } =
    useSavedReferralCode();

  const onClose = useCallback(() => {
    removeReferralCodeFromUrl();
    handleRemoveSavedReferralCode();

    handleClose();
  }, [handleClose, handleRemoveSavedReferralCode]);

  const onSignInButtonClick = useCallback(() => {
    handleSignInDialogOpen();

    handleClose();
  }, [handleClose, handleSignInDialogOpen]);

  const { referralCode: referralCodeFromUrl } = useReferralCode();
  const { isLoggedIn } = useAuth();

  const [applyReferralCode, { isLoading: isActivating }] =
    useApplyReferralCodeMutation();

  const referralCode = referralCodeFromUrl || savedReferralCode;

  const onActivateButtonClick = useCallback(async () => {
    if (referralCode) {
      const response = await applyReferralCode({ code: referralCode });

      if (isMutationSuccessful(response)) {
        handleSuccessDialogOpen();
      } else {
        removeReferralCodeFromUrl();
        handleRemoveSavedReferralCode();
      }

      handleClose();
    }
  }, [
    applyReferralCode,
    handleClose,
    handleRemoveSavedReferralCode,
    handleSuccessDialogOpen,
    referralCode,
  ]);

  const welcomeDialogProps = useMemo(
    (): IWelcomeDialogProps => ({
      hasActivateButton: isLoggedIn,
      isActivating,
      onActivateButtonClick,
      onClose,
      onSignInButtonClick,
      open: isOpened,
      referralCode,
    }),
    [
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
