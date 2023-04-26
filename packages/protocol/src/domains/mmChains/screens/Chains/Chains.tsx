import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { PublicChains } from './components/PublicChains';
import { useAuth } from '../../../auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';

export const Chains = () => {
  const { hasPrivateAccess, hasPremium, isFreePremium } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess) {
    return (
      <PrivateChains
        hasPremium={hasPremium || isFreePremium}
        hasTotalRequestsLabel={hasPremium}
      />
    );
  }

  return <PublicChains />;
};
