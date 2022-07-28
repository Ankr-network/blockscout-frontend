import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
// eslint-disable-next-line import/no-cycle
import { ChainsRoutesConfig } from 'domains/chains/Routes';

export const useChainItemBreadcrumbs = (chainName: string) => {
  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
      link: ChainsRoutesConfig.chains.path,
    },
    {
      title: chainName,
    },
  ]);
};
