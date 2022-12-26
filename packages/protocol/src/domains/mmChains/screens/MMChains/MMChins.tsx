import { PublicChains } from 'domains/chains/screens/Chains/components/PublicChains';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from '@ankr.com/common';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const MMChains = () => {
  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  return <PublicChains isMMIndex />;
};
