import { OauthLoginProvider } from 'multirpc-sdk';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@ankr.com/common';

import { useUnbindLoginProviderMutation } from 'domains/userSettings/actions/email/unbindLoginProvider';
import { isMutationSuccessful } from 'modules/common/utils/isMutationSuccessful';
import { NotificationActions } from 'domains/notification/store/NotificationActions';

export const useLoginProvider = () => {
  const dispatch = useDispatch();

  const [unbindLoginProvider, { isLoading: isUnbindProviderLoading }] =
    useUnbindLoginProviderMutation();

  const handleUnbindProvider = useCallback(
    async (provider: OauthLoginProvider) => {
      const response = await unbindLoginProvider({
        params: {
          params: { provider },
        },
        shouldNotify: false,
      });

      if (isMutationSuccessful(response)) {
        dispatch(
          NotificationActions.showNotification({
            message: t(
              `user-settings.login-methods.notifications.${provider}-disconnected`,
            ),
            severity: 'success',
          }),
        );
      }
    },
    [dispatch, unbindLoginProvider],
  );

  return {
    handleUnbindProvider,
    isUnbindProviderLoading,
  };
};
