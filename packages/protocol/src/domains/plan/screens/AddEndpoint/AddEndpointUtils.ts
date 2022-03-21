import { useCallback, useRef } from 'react';
import { INodeEntity } from 'multirpc-sdk';

import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { t } from 'modules/i18n/utils/intl';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';

export const getScheme = (data: INodeEntity[] = []): string => {
  if (!data) return '';

  const [item] = data;

  return item?.scheme || '';
};

export const useEndpointBreadcrumbs = (chainName: string, id: string) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  const hasBreadcrumbsRef = useRef<boolean>(false);

  const handleSetBreadcrumbs = useCallback(
    (title: string, chainId: string) => {
      if (!title || !chainId) return;
      if (hasBreadcrumbsRef.current) return;

      hasBreadcrumbsRef.current = true;

      setBreadcrumbs([
        {
          title: t(DashboardRoutesConfig.dashboard.breadcrumbs),
          link: DashboardRoutesConfig.dashboard.path,
        },
        {
          title,
          link: PlanRoutesConfig.endpoint.generatePath(chainId),
        },
        {
          title: t(PlanRoutesConfig.addEndpoint.breadcrumbs),
        },
      ]);
    },
    [setBreadcrumbs],
  );

  handleSetBreadcrumbs(chainName, id);
};
