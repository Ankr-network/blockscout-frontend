import { useMemo, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { fetchAllowedJwtTokensCount } from '../action/getAllowedJwtTokensCount';
import {
  getAllowedAddProjectTokenIndex,
  PRIMARY_TOKEN_INDEX,
} from '../utils/utils';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

const defaultAllowJwtTokenInfo = {
  maxTokensLimit: 0,
  shouldShowTokenManager: false,
};

export const useJwtTokenManager = () => {
  const { hasConnectWalletMessage, loading } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [
    triggerFetchAllowedJwtTokensCount,
    {
      data: {
        maxTokensLimit,
        shouldShowTokenManager,
      } = defaultAllowJwtTokenInfo,
      isSuccess,
    },
    reset,
  ] = useQueryEndpoint(fetchAllowedJwtTokensCount);

  useEffect(() => {
    triggerFetchAllowedJwtTokensCount({ group });
    return reset;
  }, [group, triggerFetchAllowedJwtTokensCount, reset]);

  const [
    fetchAllJwtTokenRequestsQuery,
    { data: { jwtTokens } = defaultData, isLoading },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    if (!loading && shouldShowTokenManager) {
      fetchAllJwtTokenRequestsQuery({ loading, group });
    }
  }, [shouldShowTokenManager, loading, fetchAllJwtTokenRequestsQuery, group]);

  const allowedAddProjectTokenIndex = useMemo(
    () => getAllowedAddProjectTokenIndex(maxTokensLimit, jwtTokens),
    [maxTokensLimit, jwtTokens],
  );

  const enableAddProject =
    jwtTokens.length < maxTokensLimit &&
    allowedAddProjectTokenIndex > PRIMARY_TOKEN_INDEX;

  return {
    isLoading,
    enableAddProject,
    hasConnectWalletMessage,
    shouldShowTokenManager: shouldShowTokenManager && isSuccess,
    allowedAddProjectTokenIndex,
    jwtTokens,
  };
};
