import { TrackTopUpSubmit } from 'domains/account/types';
import { useEmailData } from 'domains/userSettings/screens/Settings/hooks/useSettings';

import { TopUpEmailDialog } from '../ANKRTopUpForm/TopUpEmailDialog';
import { USDTopUpForm } from './USDTopUpForm';
import { useOnTopUpSubmit } from './hooks/useOnTopUpSubmit';

export interface USDTopUpFormContainerProps {
  trackSubmit: TrackTopUpSubmit;
  usdPriceId?: string;
}

export const USDTopUpFormContainer = ({
  trackSubmit,
  usdPriceId,
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
        shouldUseDefaultValue={!usdPriceId}
        trackSubmit={trackSubmit}
        usdPriceId={usdPriceId}
      />
      <TopUpEmailDialog dialogProps={dialogProps} emailDataProps={emailData} />
    </>
  );
};
