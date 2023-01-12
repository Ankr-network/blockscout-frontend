import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';

export const AccountDetailsAnkrTopUpForm = () => {
  const { isOldPremium, hasWeb3Connection } = useAccountAuth();

  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);

  const initialValues = useInitialValues(isOldPremium);

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      validateAmount={value =>
        validateAnkrAmount(value, isOldPremium, ankrBalance)
      }
    />
  );
};
