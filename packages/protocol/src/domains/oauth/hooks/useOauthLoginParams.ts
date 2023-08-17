import { useLazyFetchOauthLoginParamsQuery } from '../actions/fetchOauthLoginParams';

export const useOauthLoginParams = () => {
  const [handleFetchLoginParams, { isLoading, isUninitialized }] =
    useLazyFetchOauthLoginParamsQuery();

  return { handleFetchLoginParams, loading: isLoading || !isUninitialized };
};
