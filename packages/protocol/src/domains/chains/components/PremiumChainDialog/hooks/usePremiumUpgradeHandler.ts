import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useContentType } from './useContentType';

export type PremiumUpgradeHandlerParams = Pick<
  ReturnType<typeof useContentType>,
  'setSignUp' | 'setTopUp'
> & {
  onUpgrade?: () => void;
};

export const usePremiumUpgradeHandler = ({
  onUpgrade = () => {},
  setSignUp,
  setTopUp,
}: PremiumUpgradeHandlerParams) => {
  const { isLoggedIn } = useAuth();

  return useCallback(() => {
    onUpgrade();

    if (isLoggedIn) {
      setTopUp();
    } else {
      setSignUp();
    }
  }, [isLoggedIn, onUpgrade, setSignUp, setTopUp]);
};
