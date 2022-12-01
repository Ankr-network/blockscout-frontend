import { useContext } from 'react';

import { USDTopUpForm } from './USDTopUpForm';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { TopUpFormContext } from '../TopUpForm/TopUpFormUtils';
import { TopUpEmailDialog } from '../TopUpForm/TopUpEmailDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './USDTopUpFormUtils';

export const USDTopUpFormContainer = () => {
  const { credentials, workerTokenData } = useAuth();

  const { isAccountPage } = useContext(TopUpFormContext);

  const emailData = useEmailData();

  const { onSubmit, isLoading, ...dialogProps } = useOnTopUpSubmit(
    isAccountPage,
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
        hasRateBlock={isAccountPage}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
