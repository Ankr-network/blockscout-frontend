import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from 'domains/account/store/accountWithdrawSlice';
import { WithdrawSteps } from './components/WithdrawSteps';
import { useWithdrawSteps } from './WithdrawUtils';

interface WithdrawProps {
  initialStep: WithdrawStep;
}

export const Withdraw = ({ initialStep }: WithdrawProps) => {
  const { step, onConfirm, loading, hasError } = useWithdrawSteps(initialStep);

  const transaction = useAppSelector(selectTransaction);

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
