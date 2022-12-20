import { useCallback, useMemo } from 'react';

import { ILinkExpiredActionSlotProps } from './components/LinkExpiredActionSlot';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useLazyUserSettingsResendConfirmationCodeQuery } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useLinkParams } from 'domains/userSettings/hooks/useLinkParams';

export const useLinkExpiredCard = () => {
  const { email } = useLinkParams();
  const [
    resendConfirmationCode,
    {
      data: resendEmailData,
      isLoading: resendEmailLoading,
      error: resendEmailError,
    },
  ] = useLazyUserSettingsResendConfirmationCodeQuery();

  const onResendEmail = useCallback((): void => {
    if (!email) return;

    resendConfirmationCode({ params: { email }, shouldNotify: false });
  }, [resendConfirmationCode, email]);

  const {
    errorMessage: resendEmailErrorMessage,
    eventHandler: handleResendEmail,
  } = useEmailErrorWithTimeout(resendEmailError, onResendEmail);

  const actionProps = useMemo<ILinkExpiredActionSlotProps>(
    () => ({
      resendEmailErrorMessage,
      resendEmailData,
      resendEmailLoading,
      onResendEmail: handleResendEmail,
    }),
    [
      handleResendEmail,
      resendEmailData,
      resendEmailErrorMessage,
      resendEmailLoading,
    ],
  );

  return {
    email,

    actionProps,
  };
};
