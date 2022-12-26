import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';

export const PricingAnkrTopUpForm = () => {
  const { credentials } = useAccountAuth();
  const { ankrBalance } = useAnkrBalanceOnWallet(Boolean(credentials));

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
