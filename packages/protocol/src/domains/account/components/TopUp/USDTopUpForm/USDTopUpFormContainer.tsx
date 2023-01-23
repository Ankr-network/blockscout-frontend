import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { TrackTopUpSubmit } from 'domains/account/types';
import { USDTopUpForm } from './USDTopUpForm';
import { useAccountAuth } from 'domains/account/hooks/useAccountAuth';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './USDTopUpFormUtils';

export interface USDTopUpFormContainerProps {
  trackSubmit: TrackTopUpSubmit;
}

export const USDTopUpFormContainer = ({
  trackSubmit,
}: USDTopUpFormContainerProps) => {
  const { isOldPremium, hasPrivateAccess } = useAccountAuth();

  const emailData = useEmailData();

  const { onSubmit, isLoading, ...dialogProps } = useOnTopUpSubmit(
    emailData?.confirmedEmail,
    emailData?.pendingEmail,
    trackSubmit,
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
