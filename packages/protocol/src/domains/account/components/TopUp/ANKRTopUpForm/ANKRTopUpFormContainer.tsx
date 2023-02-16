import { ANKRTopUpForm } from './ANKRTopUpForm';
import {
  useCheckLoginStep,
  useCheckBrokenTransaction,
  useOnTopUpSubmit,
} from './ANKRTopUpFormUtils';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { TopUpEmailDialog } from './TopUpEmailDialog';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { AnkrTopUpFormContainerProps } from './ANKRTopUpFormTypes';

export const ANKRTopUpFormContainer = ({
  initialValues,
  trackSubmit,
  validateAmount,
}: AnkrTopUpFormContainerProps) => {
  useCheckBrokenTransaction();
  const { isWalletConnected } = useAuth();

  const { hasLoginStep } = useCheckLoginStep();

  const emailData = useEmailData();

  const { onSubmit, ...dialogProps } = useOnTopUpSubmit(
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
    trackSubmit,
  );

  return (
    <>
      <ANKRTopUpForm
        hasLoginStep={hasLoginStep}
        initialValues={initialValues}
        isWalletConnected={isWalletConnected}
        onSubmit={onSubmit}
        validateAmount={validateAmount}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
