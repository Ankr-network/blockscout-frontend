import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { SignupDialogState } from '../SignupDialogDefaultContent';

interface IUseDialogTitleProps {
  currentState: SignupDialogState;
  externalTitle?: string;
  hasOauthLogin?: boolean;
  hasOnlyGoogleAuth?: boolean;
  loading: boolean;
}

export const useDialogTitle = ({
  currentState,
  externalTitle,
  hasOauthLogin,
  hasOnlyGoogleAuth,
  loading,
}: IUseDialogTitleProps) => {
  return useMemo(() => {
    if (loading) {
      return '';
    }

    if (externalTitle) {
      return externalTitle;
    }

    if (hasOnlyGoogleAuth) {
      return t('signup-modal.title-gauth');
    }

    if (currentState === SignupDialogState.WEB3) {
      return t('signup-modal.web3.title');
    }

    if (hasOauthLogin) {
      return t('signup-modal.web3.connect-wallet');
    }

    return t('signup-modal.title');
  }, [externalTitle, loading, hasOnlyGoogleAuth, currentState, hasOauthLogin]);
};
