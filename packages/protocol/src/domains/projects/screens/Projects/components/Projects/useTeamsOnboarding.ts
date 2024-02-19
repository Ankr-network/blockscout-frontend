import { useCallback, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';
import {
  isTeamsOnboardingPassed,
  setTeamsOnboardingCompleted,
} from 'modules/common/utils/onboardingUtils';
import { useAppSelector } from 'store/useAppSelector';
import { selectIsWeb3UserWithEmailBound } from 'domains/auth/store';

export const useTeamsOnboarding = () => {
  const { isLoggedIn } = useAuth();
  const isWeb3UserWithEmailBound = useAppSelector(
    selectIsWeb3UserWithEmailBound,
  );
  const {
    isOpened: isTeamOnboardingDialogOpened,
    onClose: handleTeamOnboardingDialogClose,
    onOpen: handleTeamOnboardingDialogOpen,
  } = useDialog();

  const hasTeamsOnboardingFlag = isTeamsOnboardingPassed();

  useEffect(() => {
    const shouldOpenTeamsOnboardingDialog =
      isLoggedIn &&
      !hasTeamsOnboardingFlag &&
      // we need it to prevent showing dialog before modules/layout/components/ConnectWalletDialog/ConnectWalletDialog.tsx
      !isWeb3UserWithEmailBound;

    if (shouldOpenTeamsOnboardingDialog) {
      handleTeamOnboardingDialogOpen();
    }
  }, [
    isLoggedIn,
    hasTeamsOnboardingFlag,
    isWeb3UserWithEmailBound,
    handleTeamOnboardingDialogOpen,
  ]);

  const handleClose = useCallback(() => {
    // and after the user completes the onboarding, we need to set isTeamsOnboardingCompleted: true flag in localstorage
    setTeamsOnboardingCompleted();
    handleTeamOnboardingDialogClose();
  }, [handleTeamOnboardingDialogClose]);

  return {
    isTeamOnboardingDialogOpened,
    handleTeamOnboardingDialogClose: handleClose,
  };
};
