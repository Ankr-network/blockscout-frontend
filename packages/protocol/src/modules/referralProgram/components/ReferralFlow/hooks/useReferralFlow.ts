import { useMemo, useState } from 'react';

import { useDialog } from 'modules/common/hooks/useDialog';
import { useImagePreloader } from 'modules/common/hooks/useImagePreloader';
import { useReferralProgram } from 'modules/referralProgram/hooks/useReferralProgram';

import { IReferralFlowProps } from '../ReferralFlow';
import { useIneligibleAccountDialog } from '../../IneligibleAccountDialog';
import { useInitReferralFlowWithSavedCode } from './useInitReferralFlowWithSavedCode';
import { useInitiReferralFlow } from './useInitReferralFlow';
import { useSignInDialogProps } from './useSignInDialogProps';
import { useSuccessDialog } from '../../SuccessDialog';
import { useSwitchAccountDialog } from '../../SwitchAccountDialog';
import { useWelcomeDialog } from '../../WelcomeDialog';

export const useReferralFlow = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    isOpened: isSignInDialogOpened,
    onClose: handleSignInDialogClose,
    onOpen: handleSignInDialogOpen,
  } = useDialog();

  const { banner, blockchainName } = useReferralProgram();

  const { isLoaded: isBannerLoaded } = useImagePreloader({ src: banner });

  const { handleSuccessDialogOpen, successDialogProps } = useSuccessDialog({
    banner,
    blockchainName,
  });

  const { handleIneligibleAccountDialogOpen, ineligibleAccountDialogProps } =
    useIneligibleAccountDialog({
      banner,
      blockchainName,
      handleSignInDialogOpen,
    });

  const { handleWelcomeDialogOpen, welcomeDialogProps } = useWelcomeDialog({
    banner,
    blockchainName,
    handleSignInDialogOpen,
  });

  const { handleSwitchAccountDialogOpen, switchAccountDialogProps } =
    useSwitchAccountDialog({ banner, blockchainName });

  const { signInDialogProps } = useSignInDialogProps({
    handleIneligibleAccountDialogOpen,
    handleSignInDialogClose,
    handleWelcomeDialogOpen,
    isSignInDialogOpened,
    setHasLoggedIn,
    setIsLoggingOut,
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
    handleSuccessDialogOpen,
    handleSwitchAccountDialogOpen,
    handleWelcomeDialogOpen,
    hasLoggedIn,
    isBannerLoaded,
    isLoggingOut,
  });

  // to init referral flow after oauth logging in
  useInitReferralFlowWithSavedCode({
    handleIneligibleAccountDialogOpen,
    handleSuccessDialogOpen,
    handleSwitchAccountDialogOpen,
    isBannerLoaded,
  });

  return { referralFlowProps };
};
