import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { useAuth } from '../../../auth/hooks/useAuth';

export const Chains = () => {
  const { hasPrivateAccess, hasPremium, isFreePremium } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  useRedirectToEnterpriseOnGroupChange();

  if (hasPrivateAccess) {
    return (
      <PrivateChains
        hasPremium={hasPremium}
        isFreePremium={isFreePremium}
        hasTotalRequestsLabel={hasPremium}
      />
    );
  }

  return <PublicChains />;
};
