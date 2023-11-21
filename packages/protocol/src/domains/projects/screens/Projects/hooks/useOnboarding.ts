import { useCallback, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useDialog } from 'modules/common/hooks/useDialog';

const ONBOARDING_FLAG = 'isOnboardingCompleted';

export const useOnboarding = () => {
  const { isLoggedIn } = useAuth();

  const { isOpened, onClose, onOpen } = useDialog();

  useEffect(() => {
    // on the first render, we need to check if the user is already logged in
    if (isLoggedIn) {
      // check isOnboardingCompleted flag in localstorage
      // if it's not set, we need to show onboardingDialog
      if (!localStorage.getItem(ONBOARDING_FLAG)) {
        onOpen();
      }
    }
  }, [isLoggedIn, onOpen]);

  const handleClose = useCallback(() => {
    // and after the user completes the onboarding, we need to set isOnboardingCompleted: true flag in localstorage
    localStorage.setItem(ONBOARDING_FLAG, 'true');
    onClose();
  }, [onClose]);

  return { isOpened, onClose: handleClose, onOpen };
};
