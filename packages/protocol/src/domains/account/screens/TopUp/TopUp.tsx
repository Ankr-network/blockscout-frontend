import { TopUpStep } from 'domains/account/actions/topUp/const';
import { TopUpSteps } from './components/TopUpSteps';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';
import { useTopupSteps } from './TopUpUtils';

interface TopUpProps {
  initialStep: TopUpStep;
  hasPrivateAccess: boolean;
}

export const TopUp = ({ initialStep, hasPrivateAccess }: TopUpProps) => {
  const {
    amount,
    hasError,
    isRejectAllowanceLoading,
    loading,
    loadingWaitTransactionConfirming,
    onConfirm,
    onReject,
    step,
  } = useTopupSteps(initialStep);
  const { walletMeta } = useAuth();

  const transaction = useSelectTopUpTransaction();

  return (
    <TopUpSteps
      amount={amount}
      hasError={hasError}
      hasPrivateAccess={hasPrivateAccess}
      isRejectAllowanceLoading={isRejectAllowanceLoading}
      loading={loading}
      loadingWaitTransactionConfirming={loadingWaitTransactionConfirming}
      onConfirm={onConfirm}
      onReject={onReject}
      step={step}
      transactionHash={transaction?.topUpTransactionHash}
      walletMeta={walletMeta}
    />
  );
};
