import { useSelector } from 'react-redux';
import { selectChainsOriginURL } from 'domains/chains/store/chainsSlice';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useChainItemBreadcrumbs = (chainName: string) => {
  const chainsOriginURL =
    useSelector(selectChainsOriginURL) ?? ChainsRoutesConfig.chains.path;

  useSetBreadcrumbs([
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
      link: chainsOriginURL,
    },
    {
      title: chainName,
    },
  ]);
};
