import { useCallback, useEffect, useMemo, useState } from 'react';
import { t } from '@ankr.com/common';

import { trackSignUpModalClose } from 'modules/analytics/mixpanel/trackSignUpModalClose';
import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';
import { SignupDialogState } from './SignupDialogContent/SignupDialogDefaultContent';

interface SignupDialogHookProps {
  hasOauthLogin?: boolean;
  onClose: () => void;
  onGoogleSignUp?: () => void;
}

export const useSignupDialog = ({
  onClose,
  hasOauthLogin,
  onGoogleSignUp = () => {},
}: SignupDialogHookProps) => {
  const { handleFetchLoginParams, loading } = useOauthLoginParams();

  const [currentState, setCurrentState] = useState<SignupDialogState>(
    SignupDialogState.DEFAULT,
  );

  useEffect(() => {
    if (hasOauthLogin) {
      setCurrentState(SignupDialogState.WEB3);
    }
  }, [hasOauthLogin]);

  const dialogTitle = useMemo(() => {
    if (loading) return '';

    if (currentState === SignupDialogState.WEB3) {
      return t('signup-modal.web3.title');
    }

    if (hasOauthLogin) return t('signup-modal.connect-wallet');

    return t('signup-modal.title');
  }, [loading, hasOauthLogin, currentState]);

  // closes the Dialog without user interaction
  const handleClose = useCallback(() => {
    onClose();

    if (!hasOauthLogin) {
      setCurrentState(SignupDialogState.DEFAULT);
    }
  }, [hasOauthLogin, onClose]);

  // user clicks on Close Button
  const onDialogClose = useCallback(() => {
    handleClose();

    trackSignUpModalClose();
  }, [handleClose]);

  const onGoogleButtonClick = useCallback(() => {
    handleFetchLoginParams();
    onGoogleSignUp();
  }, [handleFetchLoginParams, onGoogleSignUp]);

  return {
    currentState,
    handleClose,
    setWeb3State: () => setCurrentState(SignupDialogState.WEB3),
    onGoogleButtonClick,
    loading,
    dialogTitle,
    onDialogClose,
  };
};
