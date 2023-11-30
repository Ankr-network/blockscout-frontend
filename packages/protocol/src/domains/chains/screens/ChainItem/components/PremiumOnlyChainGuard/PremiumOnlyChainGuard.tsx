import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { Chain } from 'modules/chains/types';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface PremiumOnlyChainGuardProps {
  chain?: Chain;
  children: JSX.Element;
}

export const PremiumOnlyChainGuard = ({
  chain,
  children,
}: PremiumOnlyChainGuardProps) => {
  const { hasPrivateAccess } = useAuth();
  const { replace } = useHistory();

  const isPremiumOnly = Boolean(chain?.premiumOnly);

  useEffect(() => {
    if (isPremiumOnly && !hasPrivateAccess) {
      replace(ChainsRoutesConfig.chains.generatePath());
    }
  }, [hasPrivateAccess, isPremiumOnly, replace]);

  return children;
};
