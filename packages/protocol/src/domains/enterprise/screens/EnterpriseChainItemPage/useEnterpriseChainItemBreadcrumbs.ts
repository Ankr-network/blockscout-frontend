import { useSelector } from 'react-redux';
import { t } from '@ankr.com/common';

import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { selectChainsOriginURL } from 'domains/chains/store/chainsSlice';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

export const useEnterpriseChainItemBreadcrumbs = (chainName: string) => {
  const chainsOriginURL =
    useSelector(selectChainsOriginURL) || EnterpriseRoutesConfig.chains.path;

  const routeTitle = {
    title: chainName,
  };

  let breadcrumbs = [
    {
      title: t(EnterpriseRoutesConfig.chains.breadcrumbs),
      link: chainsOriginURL,
    },
    routeTitle,
  ];

  if (chainName === t(AdvancedApiRoutesConfig.advancedApi.breadcrumbs)) {
    breadcrumbs = [routeTitle];
  }

  useSetBreadcrumbs(breadcrumbs);
};
