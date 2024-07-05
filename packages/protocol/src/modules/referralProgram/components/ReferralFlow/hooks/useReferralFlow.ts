import { useMemo } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';

import { IReferralFlowProps } from '../ReferralFlow';
import { useIneligibleAccountDialog } from '../../IneligibleAccountDialog';
import { useInitReferralFlowWithSavedCode } from './useInitReferralFlowWithSavedCode';
import { useInitiReferralFlow } from './useInitReferralFlow';
import { useSignInDialogProps } from './useSignInDialogProps';
import { useSuccessDialog } from '../../SuccessDialog';
import { useSwitchAccountDialog } from '../../SwitchAccountDialog';
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

  const { handleSwitchAccountDialogOpen, switchAccountDialogProps } =
    useSwitchAccountDialog();

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
      switchAccountDialogProps,
      welcomeDialogProps,
    }),
    [
      ineligibleAccountDialogProps,
      signInDialogProps,
      successDialogProps,
      switchAccountDialogProps,
      welcomeDialogProps,
    ],
  );

  useInitiReferralFlow({
    handleIneligibleAccountDialogOpen,
    handleSwitchAccountDialogOpen,
    handleWelcomeDialogOpen,
  });

  // to init referral flow after oauth logging in
  useInitReferralFlowWithSavedCode({
    handleIneligibleAccountDialogOpen,
    handleSwitchAccountDialogOpen,
    handleWelcomeDialogOpen,
  });

  return { referralFlowProps };
};
