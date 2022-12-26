import { ANKRTopUpForm } from 'domains/account/components/TopUp/ANKRTopUpForm';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useAnkrBalanceOnWallet } from 'domains/account/hooks/useAnkrBalanceOnWallet';
import { useInitialValues } from 'domains/account/components/TopUp/TopUpUtils';
import { validateAnkrAmount } from 'domains/account/components/TopUp/ANKRTopUpForm/ANKRTopUpFormUtils';

export const AccountDetailsAnkrTopUpForm = () => {
  const {
    hasPrivateAccess,
    workerTokenData,
    hasOauthLogin,
    hasWeb3Connection,
  } = useAccountAuth();

  const { ankrBalance } = useAnkrBalanceOnWallet(hasWeb3Connection);

  const hasExpiredToken =
    hasPrivateAccess && !workerTokenData?.userEndpointToken && !hasOauthLogin;

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
