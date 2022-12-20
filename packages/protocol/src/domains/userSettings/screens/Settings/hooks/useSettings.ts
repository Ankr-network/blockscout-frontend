import { useEffect } from 'react';

import { makeEmailStatuses } from 'domains/userSettings/utils/makeEmailStatuses';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useInviteEmail } from './useInviteEmail';
import { useLazyUserSettingsGetEmailBindingsQuery } from 'domains/userSettings/actions/email/getEmailBindings';

export interface EmailData {
  confirmedEmail?: string;
  inviteEmail?: string;
  isInviteEmailValid: boolean;
  isLoading: boolean;
  pendingEmail?: string;
  pristine: boolean;
  resetInviteEmail: () => void;
}

export const useEmailData = (): EmailData => {
  const [getEmailBindings, { data, isLoading, isUninitialized: pristine }] =
    useLazyUserSettingsGetEmailBindingsQuery();

  const [inviteEmail, isInviteEmailValid, resetInviteEmail] = useInviteEmail();

  const { hasOauthLogin, hasWeb3Connection } = useAuth();

  useEffect(() => {
    if (hasOauthLogin || hasWeb3Connection) {
      getEmailBindings();
    } else {
      // TODO reset email binding
    }
  }, [getEmailBindings, hasOauthLogin, hasWeb3Connection]);

  const { confirmedEmail, pendingEmail } = makeEmailStatuses(data);

  return {
    confirmedEmail,
    inviteEmail,
    isInviteEmailValid,
    isLoading,
    pendingEmail,
    pristine,
    resetInviteEmail,
  };
};
