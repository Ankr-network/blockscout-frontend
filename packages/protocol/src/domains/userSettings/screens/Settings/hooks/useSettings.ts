import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { resetRequests } from '@redux-requests/core';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { getEmailBindings } from 'domains/userSettings/actions/email/getEmailBindings';
import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { useDispatch } from 'react-redux';
import { useSettingsBreadcrumbs } from '../SettingsUtils';
import { useInviteEmail } from './useInviteEmail';

export interface SettingsQuery {
  confirmedEmail?: string;
  inviteEmail?: string;
  isInviteEmailValid: boolean;
  loading: boolean;
  pendingEmail?: string;
  resetInviteEmail: () => void;
}

export const useSettingsQuery = (): SettingsQuery => {
  const { data, loading } = useQuery({ type: getEmailBindings });

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

  useSettingsBreadcrumbs();

  const { confirmedEmail, pendingEmail } = makeEmailStatuses(data);

  return {
    confirmedEmail,
    inviteEmail,
    isInviteEmailValid,
    loading,
    pendingEmail,
    resetInviteEmail,
  };
};
