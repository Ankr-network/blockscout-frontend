import { useSelector } from 'react-redux';
import { t } from '@ankr.com/common';

import { AdvancedApiRoutesConfig } from 'domains/advancedApi/routes';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { selectChainsOriginURL } from 'domains/chains/store/chainsSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

export const useChainItemBreadcrumbs = (chainName: string) => {
  const { isLoggedIn } = useAuth();

  const chainsOriginURL =
    useSelector(selectChainsOriginURL) ||
    ChainsRoutesConfig.chains.generatePath({ isLoggedIn });

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
