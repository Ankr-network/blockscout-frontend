import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { SignupDialogState } from '../SignupDialogDefaultContent';

interface IUseDialogTitleProps {
  loading: boolean;
  currentState: SignupDialogState;
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
}

export const useDialogTitle = ({
  loading,
  currentState,
  hasOauthLogin,
  hasOnlyGoogleAuth,
}: IUseDialogTitleProps) => {
  return useMemo(() => {
    if (loading) return '';

    if (hasOnlyGoogleAuth) return t('signup-modal.title-gauth');

    if (currentState === SignupDialogState.WEB3) {
      return t('signup-modal.web3.title');
    }

    if (hasOauthLogin) return t('signup-modal.web3.connect-wallet');

    return t('signup-modal.title');
  }, [loading, hasOnlyGoogleAuth, currentState, hasOauthLogin]);
};
