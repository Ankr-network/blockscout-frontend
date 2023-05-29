import { useEffect } from 'react';

import { useAuth } from '../domains/auth/hooks/useAuth';
import { checkChangedSignupUserSettingsAndUpdate } from 'domains/userSettings/actions/checkChangedSignupUserSettingsAndUpdate';
import { useQueryEndpoint } from './useQueryEndpoint';

export const useCheckChangedSignupUserSettingsAndUpdate = () => {
  const { isLoggedIn } = useAuth();

  const [checkSettings] = useQueryEndpoint(
    checkChangedSignupUserSettingsAndUpdate,
  );

  useEffect(() => {
    if (isLoggedIn) {
      checkSettings();
    }
  }, [isLoggedIn, checkSettings]);
};
