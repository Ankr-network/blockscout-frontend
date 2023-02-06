import { t } from '@ankr.com/common';

import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { MetamaskChains } from './components/MetamaskChains';

export const Chains = () => {
  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
    },
  ]);

  return <MetamaskChains />;
};
