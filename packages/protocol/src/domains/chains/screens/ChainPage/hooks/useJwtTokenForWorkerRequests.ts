import { WorkerTokenData } from 'multirpc-sdk';
import { useMemo } from 'react';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useJWTs } from 'domains/jwtToken/hooks/useJWTs';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

const getJwtToken = (
  jwtTokens: JWT[],
  selectedTokenIndex: number,
  workerTokenData?: WorkerTokenData,
) => {
  if (selectedTokenIndex > PRIMARY_TOKEN_INDEX) {
    return jwtTokens.find(item => item.index === selectedTokenIndex)?.jwtData;
  }

  return workerTokenData?.signedToken;
};

export const useJwtTokenForWorkerRequests = () => {
  const { workerTokenData } = useAuth();

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const { jwts, loading: jwtsLoading } = useJWTs({
    group,
    skipFetching: true,
  });

  const { groupToken, isLoadingGroupToken } = useGroupJwtToken();

  const { tokenIndex } = useTokenManagerConfigSelector();

  const jwtToken = useMemo(
    () => getJwtToken(jwts, tokenIndex, workerTokenData),
    [jwts, tokenIndex, workerTokenData],
  );

  const shouldUseGroupToken = useMemo(() => {
    return tokenIndex === PRIMARY_TOKEN_INDEX && groupToken?.jwtData;
  }, [tokenIndex, groupToken]);

  return {
    jwtToken: shouldUseGroupToken ? groupToken?.jwtData : jwtToken,
    isLoading: jwtsLoading || isLoadingGroupToken,
  };
};
