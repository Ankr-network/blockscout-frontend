import { useDispatchRequest } from '@redux-requests/react';
import { useCallback } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { resendConfirmationCode } from 'domains/userSettings/actions/email/resendConfirmationCode';
import { useEmailErrorWithTimeout } from 'domains/userSettings/hooks/useEmailErrorWithTimeout';
import { useQueryParams } from 'modules/common/hooks/useQueryParams';

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
    errorMessage: resendEmailErrorMessage,
    isDisabled: isResendEmailDisabled,
  } = useEmailErrorWithTimeout({
    type: resendConfirmationCode.toString(),
    requestKey: address,
  });

  return {
    email,
    isResendEmailDisabled,
    resendEmailErrorMessage,
    onResendEmail,
  };
};
