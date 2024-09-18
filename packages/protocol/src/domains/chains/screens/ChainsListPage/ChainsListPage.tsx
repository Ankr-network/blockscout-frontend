import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { useChainViewSelector } from './components/ChainViewSelector';

export const ChainsListPage = () => {
  const { hasPrivateAccess } = useAuth();

  useRedirectToEnterpriseOnGroupChange();

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  const { chainsViewTabs, selectedChainsViewTab } = useChainViewSelector();

  if (hasPrivateAccess) {
    return (
      <PrivateChains
        chainsViewTabs={chainsViewTabs}
        selectedChainsViewTab={selectedChainsViewTab}
      />
    );
  }

  return (
    <PublicChains
      chainsViewTabs={chainsViewTabs}
      selectedChainsViewTab={selectedChainsViewTab}
    />
  );
};
