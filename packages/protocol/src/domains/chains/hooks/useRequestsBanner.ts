import { useEffect, useMemo } from 'react';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyChainsFetchUserRequestsQuery } from 'domains/chains/actions/private/fetchUserRequests';
import { Timeframe } from 'domains/chains/types';

export const useRequestsBanner = (timeframe: Timeframe) => {
  const { workerTokenData } = useAuth();

  const userToken = useMemo(
    () => workerTokenData?.userEndpointToken ?? '',
    [workerTokenData?.userEndpointToken],
  );

  const [fetchUserRequests, userRequestsState] =
    useLazyChainsFetchUserRequestsQuery();

  useEffect(() => {
    fetchUserRequests({ timeframe, userToken });
  }, [fetchUserRequests, timeframe, userToken]);

  return { userRequestsState };
};
