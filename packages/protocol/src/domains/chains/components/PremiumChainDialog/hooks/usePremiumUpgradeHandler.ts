import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useContentType } from './useContentType';

export type PremiumUpgradeHandlerParams = Pick<
  ReturnType<typeof useContentType>,
  'setSignUp' | 'setTopUp'
> & {
  onTrack?: () => void;
};

export const usePremiumUpgradeHandler = ({
  onTrack = () => {},
  setSignUp,
  setTopUp,
}: PremiumUpgradeHandlerParams) => {
  const { isLoggedIn } = useAuth();

  return useCallback(() => {
    onTrack();

    if (isLoggedIn) {
      setTopUp();
    } else {
      setSignUp();
    }
  }, [isLoggedIn, onTrack, setSignUp, setTopUp]);
};
