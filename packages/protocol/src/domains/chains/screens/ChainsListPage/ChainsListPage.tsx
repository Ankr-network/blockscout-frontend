import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { usePermissionsAndRole } from 'domains/userGroup/hooks/usePermissionsAndRole';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';

export const ChainsListPage = () => {
  const { hasPrivateAccess } = useAuth();
  const { deprecatedIsFinanceRole } = usePermissionsAndRole();

  useRedirectToEnterpriseOnGroupChange();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  if (hasPrivateAccess && !deprecatedIsFinanceRole) {
    return <PrivateChains />;
  }

  return <PublicChains />;
};
