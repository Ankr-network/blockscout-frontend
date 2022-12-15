import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';

export const PricingAnkrTopUpForm = () => {
  const { credentials } = useAccountAuth();
  const { ankrBalance } = useAnkrBalanceOnWallet();

  const initialValues = useInitialValues(true);
  const shouldValidate = !credentials;

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      validateAmount={value =>
        validateAnkrAmount(value, shouldValidate, ankrBalance)
      }
    />
  );
};
