import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { resendConfirmationCode } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useLinkParams } from 'domains/userSettings/hooks/useLinkParams';
import { ILinkExpiredActionSlotProps } from './components/LinkExpiredActionSlot';

export const useLinkExpiredCard = () => {
  const { email } = useLinkParams();

  const dispatchRequest = useDispatchRequest();

  const onResendEmail = useCallback((): void => {
    if (!email) return;

    dispatchRequest(resendConfirmationCode({ email, shouldNotify: false }));
  }, [dispatchRequest, email]);

  const {
    data: resendEmailData,
    loading: resendEmailLoading,
    error: resendEmailError,
  } = useQuery({
    type: resendConfirmationCode.toString(),
  });

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
