import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useRedirectToEnterpriseOnGroupChange } from 'hooks/useRedirectToEnterpriseOnGroupChange';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { selectHasPrivateAccess } from 'domains/auth/store';
import { useAppSelector } from 'store/useAppSelector';

import { PrivateChains } from './components/PrivateChains';
import { PublicChains } from './components/PublicChains';
import { useChainViewSelector } from './components/ChainViewSelector';

export const ChainsListPage = () => {
  const hasPrivateAccess = useAppSelector(selectHasPrivateAccess);

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
