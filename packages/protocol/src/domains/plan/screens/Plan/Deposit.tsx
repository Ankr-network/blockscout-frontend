import { useQuery } from '@redux-requests/react';
import { t } from 'modules/i18n/utils/intl';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import {
  DepositStep,
  fetchDepositStatus,
} from 'modules/auth/actions/fetchDepositStatus';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { DepositSteps } from './components/DepositSteps';

export const Deposit = () => {
  const { handleDeposit, handleConnect, loading } = useAuth();

  useSetBreadcrumbs([
    {
      title: t(PlanRoutesConfig.plan.breadcrumbs),
      link: PlanRoutesConfig.plan.generatePath(),
    },
    {
      title: t(PlanRoutesConfig.planDeposit.breadcrumbs),
    },
  ]);

  const { data } = useQuery({
    type: fetchDepositStatus.toString(),
    action: fetchDepositStatus,
  });

  return (
    <DepositSteps
      step={data?.step ?? DepositStep.start}
      onDeposit={handleDeposit}
      onConnect={handleConnect}
      loading={loading}
    />
  );
};
