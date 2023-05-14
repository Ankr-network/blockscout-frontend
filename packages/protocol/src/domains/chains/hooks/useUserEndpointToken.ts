import {
  IUserJwtToken,
  fetchAllJwtTokenRequests,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

const defaultData: IUserJwtToken = {
  jwtTokens: [],
};

export const useUserEndpointToken = () => {
  const { workerTokenData } = useAuth();
  const { tokenIndex } = useTokenManagerConfigSelector();
  const [, { data: { jwtTokens } = defaultData, isLoading }] = useQueryEndpoint(
    fetchAllJwtTokenRequests,
  );
  const { groupToken } = useGroupJwtToken();
  const { isGroupSelected } = useSelectedUserGroup();

  if (isLoading) {
    return undefined;
  }

  if (jwtTokens && tokenIndex === PRIMARY_TOKEN_INDEX && isGroupSelected) {
    return groupToken?.jwtToken;
  }

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return workerTokenData?.userEndpointToken;
  }

  return jwtTokens.find(token => token.index === tokenIndex)?.userEndpointToken;
};
