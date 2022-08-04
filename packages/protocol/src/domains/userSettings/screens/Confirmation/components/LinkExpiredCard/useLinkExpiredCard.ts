import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useCallback, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { resendConfirmationCode } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';
import { ILinkExpiredActionSlotProps } from './components/LinkExpiredActionSlot';

const QUERY_EMAIL = 'email';

export const useLinkExpiredCard = () => {
  const { address } = useAuth();
  const params = useQueryParams();
  const email = params.get(QUERY_EMAIL);

  const dispatchRequest = useDispatchRequest();

  const onResendEmail = useCallback((): void => {
    if (!email) return;

    dispatchRequest(resendConfirmationCode({ address, email }));
  }, [address, dispatchRequest, email]);

  const {
    data: resendEmailData,
    loading: resendEmailLoading,
    error: resendEmailError,
  } = useQuery({
    type: resendConfirmationCode.toString(),
    requestKey: address,
  });

  const { errorMessage: resendEmailErrorMessage } =
    useEmailErrorWithTimeout(resendEmailError);

  const actionProps = useMemo<ILinkExpiredActionSlotProps>(
    () => ({
      resendEmailErrorMessage,
      resendEmailData,
      resendEmailLoading,
      onResendEmail,
    }),
    [
      onResendEmail,
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
