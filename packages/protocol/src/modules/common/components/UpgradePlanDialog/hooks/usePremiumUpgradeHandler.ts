import { useCallback } from 'react';

import { PlanID, UpgradeHandler } from '../types';
import { useAuth } from 'domains/auth/hooks/useAuth';

export type PremiumUpgradeHandlerParams = {
  onUpgrade: UpgradeHandler;
  setSignUp: () => void;
  setTopUp: () => void;
};

export const usePremiumUpgradeHandler = ({
  onUpgrade,
  setSignUp,
  setTopUp,
}: PremiumUpgradeHandlerParams) => {
  const { isLoggedIn } = useAuth();

  return useCallback(() => {
    onUpgrade(PlanID.Premium);

    if (isLoggedIn) {
      setTopUp();
    } else {
      setSignUp();
    }
  }, [isLoggedIn, onUpgrade, setSignUp, setTopUp]);
};
