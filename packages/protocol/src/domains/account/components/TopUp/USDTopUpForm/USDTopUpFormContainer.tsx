import { USDTopUpForm } from './USDTopUpForm';
import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './USDTopUpFormUtils';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';

export const USDTopUpFormContainer = () => {
  const { isOldPremium, hasPrivateAccess } = useAccountAuth();

  const emailData = useEmailData();

  const { onSubmit, isLoading, ...dialogProps } = useOnTopUpSubmit(
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
  );

  return (
    <>
      <USDTopUpForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        shouldUseDefaultValue={!hasPrivateAccess || isOldPremium}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
