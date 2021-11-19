import React from 'react';
import { useMutation, useQuery } from '@redux-requests/react';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { useSetBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { t } from 'modules/i18n/utils/intl';
import {
  DepositStep,
  fetchDepositStatus,
} from 'modules/auth/actions/fetchDepositStatus';
import { deposit } from 'modules/auth/actions/deposit';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { Deposit } from './components/Deposit';
import { ConnectWalletBlock } from './components/ConnectWalletBlock';
import { DepositSteps } from './components/DepositSteps';

export const Plan = () => {
  useSetBreadcrumbs([
    {
      title: t(PlanRoutesConfig.plan.breadcrumbs),
    },
  ]);

  const {
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

  return (
    <>
      {!isWalletConnected && (
        <ConnectWalletBlock onClick={handleConnect} isLoading={loading} />
      )}
      <Deposit onSubmit={handleDeposit} />
    </>
  );
};
