import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { TrackTopUpSubmit } from 'domains/account/types';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';

export interface AccountDetailsAnkrTopUpFormProps {
  trackSubmit: TrackTopUpSubmit;
}

export const AccountDetailsAnkrTopUpForm = ({
  trackSubmit,
}: AccountDetailsAnkrTopUpFormProps) => {
  const { hasWeb3Connection, isOldPremium } = useAccountAuth();

  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);

  const initialValues = useInitialValues(isOldPremium);

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      trackSubmit={trackSubmit}
      validateAmount={value =>
        validateAnkrAmount(value, isOldPremium, ankrBalance)
      }
    />
  );
};
