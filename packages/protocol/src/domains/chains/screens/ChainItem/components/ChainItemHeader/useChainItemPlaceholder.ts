import { t } from '@ankr.com/common';

import { useAuth } from 'domains/auth/hooks/useAuth';

export const useChainItemPlaceholder = (isMultiChain: boolean) => {
  const { isLoggedIn } = useAuth();

  const hasPlaceholder = !isLoggedIn && isMultiChain;
  const placeholder = hasPlaceholder
    ? t('chain-item.get-started.endpoints.lockedLabelHttps')
    : undefined;

  return {
    placeholder,
  };
};
