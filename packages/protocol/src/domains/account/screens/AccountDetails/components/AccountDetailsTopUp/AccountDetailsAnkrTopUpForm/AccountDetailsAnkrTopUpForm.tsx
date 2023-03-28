import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { TrackTopUpSubmit } from 'domains/account/types';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';

export interface AccountDetailsAnkrTopUpFormProps {
  trackSubmit: TrackTopUpSubmit;
}

export const AccountDetailsAnkrTopUpForm = ({
  trackSubmit,
}: AccountDetailsAnkrTopUpFormProps) => {
  const { hasPrivateAccess, hasWeb3Connection, isOldPremium } = useAuth();

  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);

  const initialValues = useInitialValues(true);

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      trackSubmit={trackSubmit}
      validateAmount={value =>
        validateAnkrAmount(
          value,
          isOldPremium || !hasPrivateAccess,
          ankrBalance,
        )
      }
    />
  );
};
