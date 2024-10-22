import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  PRIMARY_TOKEN_INDEX,
  getAllowedAddProjectTokenIndex,
} from '../utils/utils';
import { useFetchJWTs } from './useFetchJWTs';
import { useJwtManager } from './useJwtManager';

export const useJwtTokenManager = () => {
  const {
    allowedJwtsCount: maxTokensLimit,
    hasReadAccess: shouldShowTokenManager,
    hasWriteAccess,
  } = useJwtManager();

  const { hasConnectWalletMessage, loading } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const skipFetching = loading || !shouldShowTokenManager;

  const {
    isFetching,
    isLoading,
    jwts,
    jwtsState: { isUninitialized },
  } = useFetchJWTs({ group, skipFetching });

  const allowedAddProjectTokenIndex = useMemo(
    () => getAllowedAddProjectTokenIndex(maxTokensLimit, jwts),
    [maxTokensLimit, jwts],
  );

  const enableAddProject =
    jwts.length < maxTokensLimit &&
    allowedAddProjectTokenIndex > PRIMARY_TOKEN_INDEX &&
    hasWriteAccess;

  return {
    allowedAddProjectTokenIndex,
    enableAddProject,
    hasConnectWalletMessage,
    isFetching,
    isLoaded: !isUninitialized && !isLoading,
    isLoading,
    isUninitialized,
    jwtTokens: jwts,
    shouldShowTokenManager,
  };
};
