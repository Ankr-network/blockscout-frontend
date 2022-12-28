import { useLazyOauthFetchLoginParamsQuery } from '../actions/fetchLoginParams';

export interface OauthLoginParams {
  handleFetchLoginParams: () => void;
  loading: boolean;
}

export const useOauthLoginParams = (): OauthLoginParams => {
  const [handleFetchLoginParams, { isLoading, isUninitialized }] =
    useLazyOauthFetchLoginParamsQuery();

  return { handleFetchLoginParams, loading: isLoading || !isUninitialized };
};
