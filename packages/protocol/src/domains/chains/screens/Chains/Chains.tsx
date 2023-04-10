import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';

export const Chains = () => {
  const { hasPrivateAccess } = useAuth();
  const { isFinanceRole } = usePermissionsAndRole();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess && !isFinanceRole) {
    return <PrivateChains />;
  }

  return <PublicChains />;
};
