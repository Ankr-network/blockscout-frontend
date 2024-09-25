import { useEffect, useMemo } from 'react';

import { useCreateReferralCodeMutation } from 'modules/referralProgram/actions/createReferralCode';
import { useReferralCodes } from 'modules/referralProgram/hooks/useReferralCodes';
import { useReferralLinks } from 'modules/referralProgram/hooks/useReferralLinks';

import { IReferralCodeWidgetProps } from '../ReferralCodeWidget';

export const useReferralCodeWidget = () => {
  const {
    loaded: codesLoaded,
    loading: codesLoading,
    referralCodes,
  } = useReferralCodes();
  const code = referralCodes[0];

  const { referralLinks } = useReferralLinks({
    codes: [code],
    skipFetching: !code,
  });

  const [handleCreateReferralCode] = useCreateReferralCodeMutation();

  const link: string | undefined = referralLinks[code];
  const isLoading = !link;
  const shouldCreateReferalCode = codesLoaded && !codesLoading && !code;

  const referralCodeWidgetProps = useMemo(
    (): IReferralCodeWidgetProps => ({ code, isLoading, link }),
    [code, isLoading, link],
  );

  useEffect(() => {
    if (shouldCreateReferalCode) {
      handleCreateReferralCode();
    }
    // only data should be tracked
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCreateReferalCode]);

  return { referralCodeWidgetProps };
};
