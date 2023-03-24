import { useMemo, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import {
  getAllowedAddProjectTokenIndex,
  PRIMARY_TOKEN_INDEX,
} from '../utils/utils';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
  maxTokensLimit: 0,
  shouldShowTokenManager: false,
};

export const useJwtTokenManager = () => {
  const { hasConnectWalletMessage, loading } = useAuth();

  const [
    fetchAllJwtTokens,
    {
      data: { jwtTokens, maxTokensLimit, shouldShowTokenManager } = defaultData,
      isLoading,
    },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    if (!loading) {
      fetchAllJwtTokens();
    }
  }, [loading, fetchAllJwtTokens]);

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
    shouldShowTokenManager,
    allowedAddProjectTokenIndex,
    jwtTokens,
  };
};
