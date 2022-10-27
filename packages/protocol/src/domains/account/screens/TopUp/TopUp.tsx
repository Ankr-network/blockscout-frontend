import { TopUpStep } from 'domains/account/actions/topUp/const';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useAuth } from 'domains/auth/hooks/useAuth';
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
    hasError,
  } = useTopupSteps(initialStep);
  const { walletMeta } = useAuth();

  const transaction = useSelectTopUpTransaction();

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
      hasError={hasError}
      walletMeta={walletMeta}
    />
  );
};
