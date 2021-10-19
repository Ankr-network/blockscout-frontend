import React from 'react';

import { Deposit } from './components/Deposit';
import { useAuth } from '../../../../modules/auth/hooks/useAuth';
import { ProBlock } from './components/ProBlock';
import { DepositSuccess } from './components/DepositSuccess';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { t } from 'modules/i18n/utils/intl';

export const Plan = () => {
  useSetBreadcrumbs([
    {
      title: t(PlanRoutesConfig.plan.breadcrumbs),
    },
  ]);

  const { credentials, justDeposited, handleDeposit } = useAuth();

  if (credentials && justDeposited) {
    return <DepositSuccess />;
  }

  if (credentials) {
    return <ProBlock />;
  }

  return <Deposit onSubmit={handleDeposit} />;
};
