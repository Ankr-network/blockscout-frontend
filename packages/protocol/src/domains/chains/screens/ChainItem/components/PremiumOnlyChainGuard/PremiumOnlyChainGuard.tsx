import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { IApiChain } from 'domains/chains/api/queryChains';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface PremiumOnlyChainGuardProps {
  chain?: IApiChain;
  children: JSX.Element;
}

export const PremiumOnlyChainGuard = ({
  chain,
  children,
}: PremiumOnlyChainGuardProps) => {
  const { hasPremium } = useAuth();
  const { replace } = useHistory();

  const isPremiumOnly = Boolean(chain?.premiumOnly);

  useEffect(() => {
    if (isPremiumOnly && !hasPremium) {
      replace(ChainsRoutesConfig.chains.generatePath());
    }
  }, [hasPremium, isPremiumOnly, replace]);

  return children;
};
