import { OauthLoginProvider } from 'multirpc-sdk';
import { useCallback } from 'react';

import { useUnbindLoginProviderMutation } from 'domains/userSettings/actions/email/unbindLoginProvider';

export const useLoginProvider = () => {
  const [unbindLoginProvider, { isLoading: isUnbindProviderLoading }] =
    useUnbindLoginProviderMutation();

  const handleUnbindProvider = useCallback(
    async (provider: OauthLoginProvider) => {
      unbindLoginProvider({
        params: {
          params: { provider },
        },
        shouldNotify: false,
      });
    },
    [unbindLoginProvider],
  );

  return {
    handleUnbindProvider,
    isUnbindProviderLoading,
  };
};
