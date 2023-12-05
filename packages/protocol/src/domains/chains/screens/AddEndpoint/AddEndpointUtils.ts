import { useCallback, useRef } from 'react';
import { INodesDetailEntity } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { ChainsRoutesConfig } from 'domains/chains/routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const getScheme = (data: INodesDetailEntity[] = []): string => {
  if (!data) return '';

  const [item] = data;

  return item?.nodes[0]?.scheme || '';
};

export const useEndpointBreadcrumbs = (chainName = '', id = '') => {
  const { setBreadcrumbs } = useBreadcrumbs();
  const { isLoggedIn } = useAuth();

  const hasBreadcrumbsRef = useRef<boolean>(false);

  const handleSetBreadcrumbs = useCallback(
    (title: string, chainId: string) => {
      if (!title || !chainId) return;
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(ChainsRoutesConfig.chains.breadcrumbs),
          link: ChainsRoutesConfig.chains.generatePath({ isLoggedIn }),
        },
        {
          title,
          link: ChainsRoutesConfig.chainDetails.generatePath(chainId),
        },
        {
          title: t(ChainsRoutesConfig.addEndpoint.breadcrumbs),
        },
      ]);
    },
    [isLoggedIn, setBreadcrumbs],
  );

  handleSetBreadcrumbs(chainName, id);
};
