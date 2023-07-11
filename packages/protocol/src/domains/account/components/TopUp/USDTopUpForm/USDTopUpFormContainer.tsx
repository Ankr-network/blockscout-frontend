import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { TrackTopUpSubmit } from 'domains/account/types';
import { USDTopUpForm } from './USDTopUpForm';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';
import { useOnTopUpSubmit } from './hooks/useOnTopUpSubmit';

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
        isLoading={isLoading}
        onSubmit={onSubmit}
        shouldUseDefaultValue
        trackSubmit={trackSubmit}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
