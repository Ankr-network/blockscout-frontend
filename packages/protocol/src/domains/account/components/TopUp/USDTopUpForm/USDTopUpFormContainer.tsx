import { USDTopUpForm } from './USDTopUpForm';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './USDTopUpFormUtils';

export const USDTopUpFormContainer = () => {
  const { credentials, workerTokenData } = useAuth();

  const emailData = useEmailData();

  const { onSubmit, isLoading, ...dialogProps } = useOnTopUpSubmit(
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
  );

  const shouldIssueToken = !credentials || !workerTokenData?.userEndpointToken;

  return (
    <>
      <USDTopUpForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        shouldUseDefaultValue={shouldIssueToken}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
