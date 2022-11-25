import { useContext } from 'react';

import { TopUpForm } from './TopUpForm';
import {
  useCheckLoginStep,
  useCheckBrokenTransaction,
  useOnTopUpSubmit,
  TopUpFormContext,
} from './TopUpFormUtils';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { TopUpEmailDialog } from './TopUpEmailDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const TopUpFormContainer = () => {
  useCheckBrokenTransaction();
  const { isWalletConnected } = useAuth();

  const { hasLoginStep } = useCheckLoginStep();

  const emailData = useEmailData();

  const { initialValues, validateAmount, isAccountPage, balance } =
    useContext(TopUpFormContext);

  const { onSubmit, ...dialogProps } = useOnTopUpSubmit(
    isAccountPage,
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
  );

  return (
    <>
      <TopUpForm
        onSubmit={onSubmit}
        hasLoginStep={hasLoginStep}
        initialValues={initialValues}
        validateAmount={validateAmount}
        isAccountPage={isAccountPage}
        balance={balance}
        isWalletConnected={isWalletConnected}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
