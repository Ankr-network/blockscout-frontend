import { t } from '@ankr.com/common';
import { OverlaySpinner } from '@ankr.com/ui';

import { DashboardRoutesConfig } from 'domains/dashboard/routes';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';

import { DashboardContent as DashboardContentV1 } from './v1';
import { DashboardContent as DashboardContentV2 } from './v2';

export const Dashboard = () => {
  useSetBreadcrumbs([
    { title: t(DashboardRoutesConfig.dashboard.breadcrumbs) },
  ]);

  const { isEnterpriseClient, isEnterpriseStatusLoading } =
    useEnterpriseClientStatus();

  if (isEnterpriseStatusLoading) {
    return <OverlaySpinner />;
  }

  if (isEnterpriseClient) return <DashboardContentV2 />;

  return <DashboardContentV1 />;
};
