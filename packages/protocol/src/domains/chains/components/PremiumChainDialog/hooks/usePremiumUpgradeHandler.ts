import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useContentType } from './useContentType';
import { PRICING_PATH } from 'domains/pricing/Routes';

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
  const { isLoggedIn, isFreePremium } = useAuth();

  const premiumUpgradeHandler = useCallback(() => {
    onTrack();

    if (isFreePremium) return;

    if (isLoggedIn) {
      setTopUp();
    } else {
      setSignUp();
    }
  }, [isLoggedIn, isFreePremium, onTrack, setSignUp, setTopUp]);

  return {
    premiumUpgradeHandler,
    pricingLink: isFreePremium ? PRICING_PATH : '',
  };
};
