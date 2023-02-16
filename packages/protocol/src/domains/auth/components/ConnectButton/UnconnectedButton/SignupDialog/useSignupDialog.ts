import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SignupDialogState } from './SignupDialogContent';
import { t } from '@ankr.com/common';

interface SignupDialogHookProps {
  hasOauthLogin?: boolean;
  onGoogleSignUp?: () => void;
  onManualClose: () => void;
}

export const useSignupDialog = ({
  hasOauthLogin,
  onGoogleSignUp = () => {},
  onManualClose,
}: SignupDialogHookProps) => {
  const { handleFetchLoginParams, loading } = useOauthLoginParams();

  const [currentState, setCurrentState] = useState<SignupDialogState>(
    SignupDialogState.MAIN,
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

  const onDialogClose = useCallback(() => {
    if (!hasOauthLogin) {
      setCurrentState(SignupDialogState.MAIN);
    }

    onManualClose();
  }, [hasOauthLogin, onManualClose]);

  const onGoogleButtonClick = useCallback(() => {
    handleFetchLoginParams();
    onGoogleSignUp();
  }, [handleFetchLoginParams, onGoogleSignUp]);

  return {
    currentState,
    setWeb3State: () => setCurrentState(SignupDialogState.WEB3),
    onGoogleButtonClick,
    loading,
    dialogTitle,
    onDialogClose,
  };
};
