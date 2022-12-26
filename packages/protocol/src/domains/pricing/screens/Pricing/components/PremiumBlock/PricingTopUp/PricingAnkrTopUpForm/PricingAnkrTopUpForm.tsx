import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const PricingAnkrTopUpForm = () => {
  const { hasPrivateAccess, hasWeb3Connection } = useAuth();
  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);

  const initialValues = useInitialValues(true);
  const shouldValidate = !hasPrivateAccess;

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      validateAmount={value =>
        validateAnkrAmount(value, shouldValidate, ankrBalance)
      }
    />
  );
};
