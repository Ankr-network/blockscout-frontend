import { WorkerTokenData } from 'multirpc-sdk';
import { useMemo } from 'react';

import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import {
  IUserJwtToken,
  fetchAllJwtTokenRequests,
} from 'domains/jwtToken/action/getAllJwtToken';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

const defaultJWTTokens: IUserJwtToken = { jwtTokens: [] };

const getJwtToken = (
  jwtTokens: JwtManagerToken[],
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
  const [
    ,
    { data: { jwtTokens } = defaultJWTTokens, isLoading: isLoadingAllJwt },
  ] = useQueryEndpoint(fetchAllJwtTokenRequests);

  const { groupToken, isLoadingGroupToken } = useGroupJwtToken();

  const { tokenIndex } = useTokenManagerConfigSelector();

  const jwtToken = useMemo(
    () => getJwtToken(jwtTokens, tokenIndex, workerTokenData),
    [jwtTokens, tokenIndex, workerTokenData],
  );

  const shouldUseGroupToken = useMemo(() => {
    return tokenIndex === PRIMARY_TOKEN_INDEX && groupToken?.jwtData;
  }, [tokenIndex, groupToken]);

  return {
    jwtToken: shouldUseGroupToken ? groupToken?.jwtData : jwtToken,
    isLoading: isLoadingAllJwt || isLoadingGroupToken,
  };
};
