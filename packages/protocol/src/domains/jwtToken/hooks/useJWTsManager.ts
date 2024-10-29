import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import {
  PRIMARY_TOKEN_INDEX,
  getAllowedAddProjectTokenIndex,
} from '../utils/utils';
import { useJWTManagerPermissions } from './useJWTManagerPermissions';
import { useJWTs } from './useJWTs';

export const useJWTsManager = () => {
  const {
    allowedJWTsCount: maxTokensLimit,
    hasReadAccess: shouldShowTokenManager,
    hasWriteAccess,
  } = useJWTManagerPermissions();

  const { loading: authLoading } = useAuth();
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const skipFetching = authLoading || !shouldShowTokenManager;

  const {
    jwts,
    loading: jwtsLoading,
    state: { isError, isSuccess, isUninitialized },
  } = useJWTs({ group, skipFetching });

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
    isLoaded: isSuccess || isError,
    isUninitialized,
    jwts,
    jwtsLoading,
    shouldShowTokenManager,
  };
};
