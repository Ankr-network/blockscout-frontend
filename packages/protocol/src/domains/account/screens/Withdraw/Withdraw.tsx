import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { WithdrawSteps } from './components/WithdrawSteps';
import { useWithdrawSteps } from './WithdrawUtils';
import { useSelectWithdrawalTransaction } from 'domains/account/hooks/useSelectWithdrawalTransaction';

interface WithdrawProps {
  initialStep: WithdrawStep;
}

export const Withdraw = ({ initialStep }: WithdrawProps) => {
  const { step, onConfirm, loading, hasError } = useWithdrawSteps(initialStep);

  const transaction = useSelectWithdrawalTransaction();

  return (
    <WithdrawSteps
      step={step}
      loading={loading}
      onConfirm={onConfirm}
      withdrawalTransactionHash={transaction?.withdrawTransactionHash}
      hasError={hasError}
    />
  );
};
