import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { ConnectWalletDialog } from 'modules/layout/components/ConnectWalletDialog';

import { ANKRTopUpForm } from './ANKRTopUpForm';
import { TopUpEmailDialog } from './TopUpEmailDialog';
import { AnkrTopUpFormContainerProps } from './ANKRTopUpFormTypes';
import { useOnTopUpSubmit } from './hooks/useOnTopUpSubmit';
import { useCheckBrokenTransaction } from './hooks/useCheckBrokenTransaction';

export const ANKRTopUpFormContainer = ({
  initialValues,
  trackSubmit,
  validateAmount,
}: AnkrTopUpFormContainerProps) => {
  useCheckBrokenTransaction();
  const { isLoggedIn } = useAuth();

  const emailData = useEmailData();

  const { onSubmit, emailDialogProps, connectWalletDialogProps } =
    useOnTopUpSubmit(
      emailData?.confirmedEmail,
      emailData?.pendingEmail,
      trackSubmit,
    );

  return (
    <>
      <ANKRTopUpForm
        hasLoginStep={false}
        initialValues={initialValues}
        isLoggedIn={isLoggedIn}
        onSubmit={onSubmit}
        trackSubmit={trackSubmit}
        validateAmount={validateAmount}
      />
      <TopUpEmailDialog
        dialogProps={emailDialogProps}
        emailDataProps={emailData}
      />
      <ConnectWalletDialog {...connectWalletDialogProps} />
    </>
  );
};
