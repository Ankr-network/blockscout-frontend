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
  validateAmount,
}: AnkrTopUpFormContainerProps) => {
  useCheckBrokenTransaction();
  const { isWalletConnected } = useAuth();

  const { hasLoginStep } = useCheckLoginStep();

  const emailData = useEmailData();

  const { onSubmit, ...dialogProps } = useOnTopUpSubmit(
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
  );

  return (
    <>
      <ANKRTopUpForm
        onSubmit={onSubmit}
        hasLoginStep={hasLoginStep}
        initialValues={initialValues}
        validateAmount={validateAmount}
        isWalletConnected={isWalletConnected}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
