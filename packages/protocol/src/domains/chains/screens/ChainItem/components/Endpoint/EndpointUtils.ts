import { IApiChain } from 'domains/chains/api/queryChains';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { t } from 'modules/i18n/utils/intl';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useCallback, useRef } from 'react';

export const getChainById = (
  chains: IApiChain[],
  chainId: string,
): IApiChain => {
  const chain = chains?.find(item => item.id === chainId);

  return chain as IApiChain;
};

export const useEndpointBreadcrumbs = (chainName: string) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const hasBreadcrumbsRef = useRef<boolean>(false);

  const handleSetBreadcrumbs = useCallback(
    (title: string) => {
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(DashboardRoutesConfig.dashboard.breadcrumbs),
          link: DashboardRoutesConfig.dashboard.path,
        },
        {
          title,
        },
      ]);
    },
    [setBreadcrumbs],
  );

  handleSetBreadcrumbs(chainName);
};
