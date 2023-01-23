import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { PricingRoutesConfig } from 'domains/pricing/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useClickHandler = () => {
  const history = useHistory();
  const { hasPremium } = useAuth();

  return useCallback(() => {
    history.push(
      hasPremium
        ? AccountRoutesConfig.accountDetails.generatePath()
        : PricingRoutesConfig.pricing.generatePath(),
    );
  }, [history, hasPremium]);
};
