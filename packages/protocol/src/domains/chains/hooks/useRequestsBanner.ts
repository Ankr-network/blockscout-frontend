import { useEffect, useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useLazyChainsFetchUserRequestsQuery } from 'domains/chains/actions/private/fetchUserRequests';
import { Timeframe } from 'domains/chains/types';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';

import { useSelectedUserGroup } from '../../userGroup/hooks/useSelectedUserGroup';

export const useRequestsBanner = (timeframe: Timeframe) => {
  const { workerTokenData } = useAuth();
  const { groupToken } = useGroupJwtToken();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const userToken = useMemo(() => {
    if (groupToken?.jwtToken) {
      return groupToken.jwtToken;
    }

    return workerTokenData?.userEndpointToken ?? '';
  }, [groupToken, workerTokenData?.userEndpointToken]);

  const [fetchUserRequests, userRequestsState] =
    useLazyChainsFetchUserRequestsQuery();

  useEffect(() => {
    fetchUserRequests({ timeframe, userToken, group });
  }, [fetchUserRequests, timeframe, userToken, group]);

  return { userRequestsState };
};
