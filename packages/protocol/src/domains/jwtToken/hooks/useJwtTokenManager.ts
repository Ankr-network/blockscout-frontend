import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useEffect } from 'react';
import {
  getallowedAddProjectTokenIndex,
  MINIMAL_TOKENS_LIMIT,
  PRIMARY_TOKEN_INDEX,
} from '../utils/utils';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
  maxTokensLimit: 0,
};

export const useJwtTokenManager = () => {
  const { hasConnectWalletMessage, loading } = useAuth();

  const [
    fetchAllJwtTokens,
    { data: { jwtTokens, maxTokensLimit } = defaultData, isLoading },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    if (!loading) {
      fetchAllJwtTokens();
    }
  }, [loading, fetchAllJwtTokens]);

  const shouldShowTokenManager = maxTokensLimit >= MINIMAL_TOKENS_LIMIT;

  const allowedAddProjectTokenIndex = getallowedAddProjectTokenIndex(
    maxTokensLimit,
    jwtTokens,
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
