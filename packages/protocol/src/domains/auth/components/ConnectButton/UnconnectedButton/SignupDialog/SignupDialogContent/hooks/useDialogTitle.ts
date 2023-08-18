import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import { SignupDialogState } from '../SignupDialogDefaultContent';

export const useDialogTitle = (
  loading: boolean,
  currentState: SignupDialogState,
  hasOauthLogin?: boolean,
) => {
  return useMemo(() => {
    if (loading) return '';

    if (currentState === SignupDialogState.WEB3) {
      return t('signup-modal.web3.title');
    }

    if (hasOauthLogin) return t('signup-modal.web3.connect-wallet');

    return t('signup-modal.title');
  }, [loading, hasOauthLogin, currentState]);
};
