import { useCallback } from 'react';

import { useOauthLoginParams } from 'domains/oauth/hooks/useOauthLoginParams';

export const useFetchOauthLoginParams = () => {
  const { handleFetchLoginParams: handleFetchOauthLoginParams } =
    useOauthLoginParams();

  return useCallback(async () => {
    const { data: oauthAuthUrl = '' } = await handleFetchOauthLoginParams();

    window.location.replace(oauthAuthUrl);
  }, [handleFetchOauthLoginParams]);
};
