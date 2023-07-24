import { useSelector } from 'react-redux';
import { t } from '@ankr.com/common';

import { selectChainsOriginURL } from 'domains/chains/store/chainsSlice';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';

export const useChainItemBreadcrumbs = (chainName: string) => {
  const chainsOriginURL =
    useSelector(selectChainsOriginURL) ?? ChainsRoutesConfig.chains.path;

  const routeTitle = {
    title: chainName,
  };

  let breadcrumbs = [
    {
      title: t(ChainsRoutesConfig.chains.breadcrumbs),
      link: chainsOriginURL,
    },
    routeTitle,
  ];

  if (chainName === t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs)) {
    breadcrumbs = [routeTitle];
  }

  useSetBreadcrumbs(breadcrumbs);
};
