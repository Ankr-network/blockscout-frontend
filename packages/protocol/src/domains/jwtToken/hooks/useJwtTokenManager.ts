import { useMemo, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import {
  getAllowedAddProjectTokenIndex,
  PRIMARY_TOKEN_INDEX,
} from '../utils/utils';
import { useJwtManager } from './useJwtManager';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

export const useJwtTokenManager = (shouldIgnoreTokenDecryption?: boolean) => {
  const {
    allowedJwtsCount: maxTokensLimit,
    hasReadAccess: shouldShowTokenManager,
    hasWriteAccess,
  } = useJwtManager();

  const { hasConnectWalletMessage, loading } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const [
    fetchAllJwtTokenRequestsQuery,
    {
      data: { jwtTokens } = defaultData,
      isLoading,
      isFetching,
      isUninitialized,
    },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    if (!loading && shouldShowTokenManager) {
      fetchAllJwtTokenRequestsQuery({
        loading,
        group,
        shouldIgnoreTokenDecryption,
      });
    }
  }, [
    shouldShowTokenManager,
    loading,
    fetchAllJwtTokenRequestsQuery,
    group,
    shouldIgnoreTokenDecryption,
  ]);

  const allowedAddProjectTokenIndex = useMemo(
    () => getAllowedAddProjectTokenIndex(maxTokensLimit, jwtTokens),
    [maxTokensLimit, jwtTokens],
  );

  const enableAddProject =
    jwtTokens.length > 0 &&
    jwtTokens.length < maxTokensLimit &&
    allowedAddProjectTokenIndex > PRIMARY_TOKEN_INDEX &&
    hasWriteAccess;

  return {
    isLoading,
    isFetching,
    isUninitialized,
    isLoaded: !isUninitialized && !isLoading,
    enableAddProject,
    hasConnectWalletMessage,
    shouldShowTokenManager,
    allowedAddProjectTokenIndex,
    jwtTokens,
  };
};
