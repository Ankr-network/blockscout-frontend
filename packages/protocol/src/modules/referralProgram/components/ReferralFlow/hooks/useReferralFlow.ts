import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IReferralFlowProps } from '../ReferralFlow';
import { useIneligibleAccountDialog } from '../../IneligibleAccountDialog';
import { useInitReferralFlowWithSavedCode } from './useInitReferralFlowWithSavedCode';
import { useInitiReferralFlow } from './useInitReferralFlow';
import { useSignInDialogProps } from './useSignInDialogProps';
import { useSuccessDialog } from '../../SuccessDialog';
import { useWelcomeDialog } from '../../WelcomeDialog';

export const useReferralFlow = () => {
  const {
    isOpened: isSignInDialogOpened,
    onClose: handleSignInDialogClose,
    onOpen: handleSignInDialogOpen,
  } = useDialog();

  const { handleSuccessDialogOpen, successDialogProps } = useSuccessDialog();

  const { handleIneligibleAccountDialogOpen, ineligibleAccountDialogProps } =
    useIneligibleAccountDialog({ handleSignInDialogOpen });

  const { handleWelcomeDialogOpen, welcomeDialogProps } = useWelcomeDialog({
    handleSignInDialogOpen,
  });

  const { signInDialogProps } = useSignInDialogProps({
    handleIneligibleAccountDialogOpen,
    handleSignInDialogClose,
    handleSuccessDialogOpen,
    handleWelcomeDialogOpen,
    isSignInDialogOpened,
  });

  const referralFlowProps = useMemo(
    (): IReferralFlowProps => ({
      ineligibleAccountDialogProps,
      signInDialogProps,
      successDialogProps,
      welcomeDialogProps,
    }),
    [
      ineligibleAccountDialogProps,
      signInDialogProps,
      successDialogProps,
      welcomeDialogProps,
    ],
  );

  useInitiReferralFlow({
    handleIneligibleAccountDialogOpen,
    handleWelcomeDialogOpen,
  });

  // to init referral flow after oauth logging in
  useInitReferralFlowWithSavedCode({
    handleIneligibleAccountDialogOpen,
    handleWelcomeDialogOpen,
  });

  return { referralFlowProps };
};
