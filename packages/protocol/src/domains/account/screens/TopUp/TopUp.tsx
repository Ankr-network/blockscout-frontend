import { TopUpStep } from 'domains/account/actions/topUp/const';
import { selectTransaction } from 'domains/account/store/accountTopUpSlice';
import { useAppSelector } from 'store/useAppSelector';
import { TopUpSteps } from './components/TopUpSteps';
import { useTopupSteps } from './TopUpUtils';

interface TopUpProps {
  initialStep: TopUpStep;
  hasCredentials: boolean;
}

export const TopUp = ({ initialStep, hasCredentials }: TopUpProps) => {
  const {
    step,
    onConfirm,
    amount,
    loading,
    onReject,
    isRejectAllowanceLoading,
  } = useTopupSteps(initialStep);

  const transaction = useAppSelector(selectTransaction);

  return (
    <TopUpSteps
      step={step}
      loading={loading}
      amount={amount}
      onConfirm={onConfirm}
      hasCredentials={hasCredentials}
      onReject={onReject}
      isRejectAllowanceLoading={isRejectAllowanceLoading}
      transactionHash={transaction?.topUpTransactionHash}
    />
  );
};
