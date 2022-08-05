import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useChainItemBreadcrumbs = (
  chainName: string,
  isWalletConnected: boolean,
) => {
  useSetBreadcrumbs([
    {
      title: isWalletConnected
        ? t(ChainsRoutesConfig.chains['connected-breadcrumbs'])
        : t(ChainsRoutesConfig.chains.breadcrumbs),
      link: ChainsRoutesConfig.chains.path,
    },
    {
      title: chainName,
    },
  ]);
};
