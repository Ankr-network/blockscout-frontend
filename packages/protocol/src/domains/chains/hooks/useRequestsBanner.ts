import { useEffect, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyChainsFetchUserRequestsQuery } from 'domains/chains/actions/private/fetchUserRequests';
import { Timeframe } from 'modules/chains/types';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

export const useRequestsBanner = (timeframe: Timeframe) => {
  const { workerTokenData } = useAuth();
  const { groupToken, isLoadingGroupToken } = useGroupJwtToken();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const userToken = useMemo(() => {
    if (isLoadingGroupToken) {
      return undefined;
    }

    if (group && !isLoadingGroupToken) {
      return groupToken?.jwtToken;
    }

    return workerTokenData?.userEndpointToken;
  }, [
    groupToken,
    workerTokenData?.userEndpointToken,
    group,
    isLoadingGroupToken,
  ]);

  const [fetchUserRequests, userRequestsState] =
    useLazyChainsFetchUserRequestsQuery();

  useEffect(() => {
    if (userToken) {
      fetchUserRequests({ timeframe, userToken, group });
    }
  }, [fetchUserRequests, timeframe, userToken, group]);

  return { userRequestsState };
};
