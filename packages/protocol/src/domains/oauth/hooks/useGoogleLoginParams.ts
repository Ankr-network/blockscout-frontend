import { useLazyFetchGoogleLoginParamsQuery } from '../actions/fetchGoogleLoginParams';

export const useGoogleLoginParams = () => {
  const [handleFetchLoginParams, { isLoading, isUninitialized }] =
    useLazyFetchGoogleLoginParamsQuery();

  return { handleFetchLoginParams, loading: isLoading || !isUninitialized };
};
