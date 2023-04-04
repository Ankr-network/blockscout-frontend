import { useMemo, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useFetchAllowedJwtTokensCountQuery } from '../action/getAllowedJwtTokensCount';
import {
  getAllowedAddProjectTokenIndex,
  PRIMARY_TOKEN_INDEX,
} from '../utils/utils';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

const defaultAllowJwtTokenInfo = {
  maxTokensLimit: 0,
  shouldShowTokenManager: false,
};

export const useJwtTokenManager = () => {
  const { hasConnectWalletMessage, loading } = useAuth();

  const {
    data: { maxTokensLimit, shouldShowTokenManager } = defaultAllowJwtTokenInfo,
    isSuccess,
  } = useFetchAllowedJwtTokensCountQuery();

  const [
    fetchAllJwtTokenRequestsQuery,
    { data: { jwtTokens } = defaultData, isLoading },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    if (!loading && shouldShowTokenManager) {
      fetchAllJwtTokenRequestsQuery(loading);
    }
  }, [shouldShowTokenManager, loading, fetchAllJwtTokenRequestsQuery]);

  const allowedAddProjectTokenIndex = useMemo(
    () => getAllowedAddProjectTokenIndex(maxTokensLimit, jwtTokens),
    [maxTokensLimit, jwtTokens],
  );

  const enableAddProject =
    jwtTokens.length < maxTokensLimit &&
    allowedAddProjectTokenIndex > PRIMARY_TOKEN_INDEX;

  return {
    isLoading: shouldShowTokenManager ? isLoading : isLoading,
    enableAddProject,
    hasConnectWalletMessage,
    shouldShowTokenManager: shouldShowTokenManager && isSuccess,
    allowedAddProjectTokenIndex,
    jwtTokens,
  };
};
