import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyChainsFetchFreeRegisteredUserRequestsQuery } from 'domains/chains/actions/private/fetchFreeRegisteredUserRequests';
import { Timeframe } from 'domains/chains/types';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useFailedRequestsBanner = (timeframe: Timeframe) => {
  const { workerTokenData } = useAuth();

  const userEndpointToken = workerTokenData?.userEndpointToken ?? '';

  const [fetchUserRequests, userRequestsState] =
    useLazyChainsFetchFreeRegisteredUserRequestsQuery();

  useOnMount(() => {
    fetchUserRequests({ timeframe, userEndpointToken });
  });

  return { userRequestsState };
};
