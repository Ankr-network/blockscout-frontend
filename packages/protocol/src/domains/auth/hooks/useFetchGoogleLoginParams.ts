import { useCallback } from 'react';

import { useGoogleLoginParams } from 'domains/oauth/hooks/useGoogleLoginParams';

export const useFetchGoogleLoginParams = () => {
  const { handleFetchLoginParams: handleFetchGoogleLoginParams } =
    useGoogleLoginParams();

  return useCallback(async () => {
    const { data: oauthAuthUrl = '' } = await handleFetchGoogleLoginParams();

    window.location.replace(oauthAuthUrl);
  }, [handleFetchGoogleLoginParams]);
};
