import { useMemo, useEffect } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import {
  IUserJwtToken,
  useLazyFetchAllJwtTokenRequestsQuery,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
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
  const { group } = useSelectedUserGroup();

  const {
    data: { maxTokensLimit, shouldShowTokenManager } = defaultAllowJwtTokenInfo,
    isSuccess,
    refetch: refetchAllowedJwtTokensCount,
  } = useFetchAllowedJwtTokensCountQuery();

  const [
    fetchAllJwtTokenRequestsQuery,
    { data: { jwtTokens } = defaultData, isLoading },
  ] = useLazyFetchAllJwtTokenRequestsQuery();

  useEffect(() => {
    refetchAllowedJwtTokensCount();
    // we need to refetch allowed jwt count on group change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group?.groupAddress]);

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
    isLoading,
    enableAddProject,
    hasConnectWalletMessage,
    shouldShowTokenManager: shouldShowTokenManager && isSuccess,
    allowedAddProjectTokenIndex,
    jwtTokens,
  };
};
