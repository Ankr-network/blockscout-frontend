import { TopUpStep } from 'domains/account/actions/topUp/const';
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

  return (
    <TopUpSteps
      step={step}
      loading={loading}
      amount={amount}
      onConfirm={onConfirm}
      hasCredentials={hasCredentials}
      onReject={onReject}
      isRejectAllowanceLoading={isRejectAllowanceLoading}
    />
  );
};
