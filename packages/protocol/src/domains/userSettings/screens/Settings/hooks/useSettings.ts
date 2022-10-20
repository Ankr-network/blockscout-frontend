import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';
import { resetRequests } from '@redux-requests/core';
import { useDispatch } from 'react-redux';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { useInviteEmail } from './useInviteEmail';

export interface EmailData {
  confirmedEmail?: string;
  inviteEmail?: string;
  isInviteEmailValid: boolean;
  loading: boolean;
  pendingEmail?: string;
  resetInviteEmail: () => void;
  pristine: boolean;
}

export const useEmailData = (): EmailData => {
  const { data, loading, pristine } = useQuery({ type: getEmailBindings });

  const [inviteEmail, isInviteEmailValid, resetInviteEmail] = useInviteEmail();

  const { isWalletConnected } = useAuth();

  const dispatch = useDispatch();

  const dispatchRequest = useDispatchRequest();

  useEffect(() => {
    if (isWalletConnected) {
      dispatchRequest(getEmailBindings());
    } else {
      dispatch(resetRequests([getEmailBindings.toString()]));
    }
  }, [dispatch, dispatchRequest, isWalletConnected]);

  const { confirmedEmail, pendingEmail } = makeEmailStatuses(data);

  return {
    confirmedEmail,
    inviteEmail,
    isInviteEmailValid,
    loading,
    pendingEmail,
    resetInviteEmail,
    pristine,
  };
};
