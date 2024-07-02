import { useMemo } from 'react';

import { ISignupDialogProps } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

import { IReferralFlowB2BProps } from '../ReferralFlowB2B';
import { useWelcomeDialogB2B } from '../../WelComeDialogB2B';

export const useReferralFlowB2B = () => {
  const {
    isOpened: isSignInDialogOpened,
    onClose: handleSignInDialogClose,
    onOpen: handlSignInDialogOpen,
  } = useDialog();

  const { handleWelcomeDialogB2BOpen, welcomeDialogB2BProps } =
    useWelcomeDialogB2B({ handlSignInDialogOpen });

  const signInDialogProps = useMemo(
    (): ISignupDialogProps => ({
      isOpen: isSignInDialogOpened,
      onClose: handleSignInDialogClose,
    }),
    [handleSignInDialogClose, isSignInDialogOpened],
  );

  const referralFlowProps = useMemo(
    (): IReferralFlowB2BProps => ({
      signInDialogProps,
      welcomeDialogB2BProps,
    }),
    [signInDialogProps, welcomeDialogB2BProps],
  );

  return { handleWelcomeDialogB2BOpen, referralFlowProps };
};
