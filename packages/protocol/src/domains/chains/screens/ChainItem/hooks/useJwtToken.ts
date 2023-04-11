import { WorkerTokenData } from 'multirpc-sdk';

import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useUserGroupFetchGroupJwtQuery } from 'domains/userGroup/actions/fetchGroupJwt';
import { JwtManagerToken } from 'domains/jwtToken/store/jwtTokenManagerSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import {
  IUserJwtToken,
  fetchAllJwtTokenRequests,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useMemo } from 'react';

const defaultJWTTokens: IUserJwtToken = { jwtTokens: [] };

const getJwtToken = (
  jwtTokens: JwtManagerToken[],
  selectedTokenIndex: number,
  workerTokenData?: WorkerTokenData,
) => {
  if (selectedTokenIndex > 0) {
    return jwtTokens.find(item => item.index === selectedTokenIndex)?.jwtData;
  }

  return workerTokenData?.signedToken;
};

export const useJwtTokenForWorkerRequests = () => {
  const { workerTokenData } = useAuth();
  const { selectedGroupAddress } = useSelectedUserGroup();
  const [
    ,
    { data: { jwtTokens } = defaultJWTTokens, isLoading: isLoadingAllJwt },
  ] = useQueryEndpoint(fetchAllJwtTokenRequests);

  const { data: groupToken, isLoading: isLoadingGroupToken } =
    useUserGroupFetchGroupJwtQuery({ group: selectedGroupAddress });

  const { tokenIndex } = useTokenManagerConfigSelector();

  const jwtToken = useMemo(
    () => getJwtToken(jwtTokens, tokenIndex, workerTokenData),
    [jwtTokens, tokenIndex, workerTokenData],
  );

  return {
    jwtToken: selectedGroupAddress ? groupToken?.jwtData : jwtToken,
    isLoading: isLoadingAllJwt || isLoadingGroupToken,
  };
};
