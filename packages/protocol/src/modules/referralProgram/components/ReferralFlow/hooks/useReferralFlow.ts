import { useCallback, useMemo } from 'react';

import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

import { IReferralFlowProps } from '../ReferralFlow';
import { renderBackButton } from '../utils/renderBackButton';
import { useSuccessDialog } from '../../SuccessDialog';
import { useWelcomeDialog } from '../../WelcomeDialog';

export const useReferralFlow = () => {
  const {
    isOpened: isSignInDialogOpened,
    onClose: handleSignInDialogClose,
    onOpen: handlSignInDialogOpen,
  } = useDialog();

  const { successDialogProps } = useSuccessDialog();

  const { handleWelcomeDialogOpen, welcomeDialogProps } = useWelcomeDialog({
    handlSignInDialogOpen,
  });

  const handleBackButtonClick = useCallback(() => {
    handleSignInDialogClose();

    handleWelcomeDialogOpen();
  }, [handleSignInDialogClose, handleWelcomeDialogOpen]);

  const signInDialogProps = useMemo(
    (): ISignupDialogProps => ({
      extraContent: renderBackButton({ onClick: handleBackButtonClick }),
      hasAutoAgreement: true,
      isOpen: isSignInDialogOpened,
      onClose: handleBackButtonClick,
    }),
    [handleBackButtonClick, isSignInDialogOpened],
  );

  const referralFlowProps = useMemo(
    (): IReferralFlowProps => ({
      signInDialogProps,
      welcomeDialogProps,
      successDialogProps,
    }),
    [signInDialogProps, successDialogProps, welcomeDialogProps],
  );

  return { handleWelcomeDialogOpen, referralFlowProps };
};
