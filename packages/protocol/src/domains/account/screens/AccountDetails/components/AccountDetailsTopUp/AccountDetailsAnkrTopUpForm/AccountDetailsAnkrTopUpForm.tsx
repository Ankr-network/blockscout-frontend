import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';

export const AccountDetailsAnkrTopUpForm = () => {
  const { credentials, workerTokenData, hasOauthLogin } = useAccountAuth();

  const { ankrBalance } = useAnkrBalanceOnWallet();

  const hasExpiredToken =
    credentials && !workerTokenData?.userEndpointToken && !hasOauthLogin;

  const initialValues = useInitialValues(hasExpiredToken);

  return (
    <ANKRTopUpForm
      initialValues={initialValues}
      validateAmount={value =>
        validateAnkrAmount(value, Boolean(hasExpiredToken), ankrBalance)
      }
    />
  );
};
