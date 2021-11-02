import React from 'react';

import { Deposit } from './components/Deposit';
import { useAuth } from '../../../../modules/auth/hooks/useAuth';
import { ProBlock } from './components/ProBlock';
import { ConnectWalletBlock } from './components/ConnectWalletBlock';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { t } from 'modules/i18n/utils/intl';
import { DepositSteps } from './components/DepositSteps';
import { useMutation, useQuery } from '@redux-requests/react';
import {
  DepositStep,
  fetchDepositStatus,
} from '../../../../modules/auth/actions/fetchDepositStatus';
import { deposit } from '../../../../modules/auth/actions/deposit';

export const Plan = () => {
  useSetBreadcrumbs([
    {
      title: t(PlanRoutesConfig.plan.breadcrumbs),
    },
  ]);

  const {
    credentials,
    handleDeposit,
    handleConnect,
    loading,
    isWalletConnected,
  } = useAuth();

  const { data } = useQuery({
    type: fetchDepositStatus.toString(),
    action: fetchDepositStatus,
  });

  const { loading: depositLoading, error: depositError } = useMutation({
    type: deposit.toString(),
  });

  if (depositLoading || depositError) {
    return (
      <DepositSteps
        step={data?.step ?? DepositStep.publicKey}
        onDeposit={handleDeposit}
        onConnect={handleConnect}
        loading={loading}
      />
    );
  }

  if (credentials) {
    return <ProBlock />;
  }

  return (
    <>
      {!isWalletConnected && (
        <ConnectWalletBlock onClick={handleConnect} isLoading={loading} />
      )}
      <Deposit onSubmit={handleDeposit} />
    </>
  );
};
