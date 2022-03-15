import { useQuery } from '@redux-requests/react';
import {
  DepositStep,
  fetchDepositStatus,
} from 'modules/auth/actions/fetchDepositStatus';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { DepositSteps } from './components/DepositSteps';

export const Deposit = () => {
  const { handleDeposit, handleConnect, loading } = useAuth();

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
