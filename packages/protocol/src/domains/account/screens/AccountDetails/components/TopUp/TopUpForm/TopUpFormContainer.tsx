import { useContext } from 'react';
import { TopUpForm } from './TopUpForm';
import {
  useCheckLoginStep,
  useCheckBrokenTransaction,
  useOnTopUpSubmit,
  TopUpFormContext,
} from './TopUpFormUtils';

export const TopUpFormContainer = () => {
  useCheckBrokenTransaction();

  const { hasLoginStep } = useCheckLoginStep();

  const onSubmit = useOnTopUpSubmit();

  const { initialValues, validateAmount, hasRateBlock, balance } =
    useContext(TopUpFormContext);

  return (
    <TopUpForm
      onSubmit={onSubmit}
      hasLoginStep={hasLoginStep}
      initialValues={initialValues}
      validateAmount={validateAmount}
      hasRateBlock={hasRateBlock}
      balance={balance}
    />
  );
};
