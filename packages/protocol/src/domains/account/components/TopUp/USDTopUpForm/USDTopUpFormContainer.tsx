import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { TrackTopUpSubmit } from 'domains/account/types';
import { USDTopUpForm } from './USDTopUpForm';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './USDTopUpFormUtils';

export interface USDTopUpFormContainerProps {
  trackSubmit: TrackTopUpSubmit;
}

export const USDTopUpFormContainer = ({
  trackSubmit,
}: USDTopUpFormContainerProps) => {
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
        shouldUseDefaultValue
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
