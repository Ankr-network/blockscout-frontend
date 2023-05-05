import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useGroupJwtToken } from 'domains/userGroup/hooks/useGroupJwtToken';

export const useUserEndpointToken = () => {
  const { workerTokenData } = useAuth();
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { jwtTokens } = useJwtTokenManager();
  const { groupToken } = useGroupJwtToken();

  if (groupToken?.jwtToken && tokenIndex === PRIMARY_TOKEN_INDEX) {
    return groupToken.jwtToken;
  }

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return workerTokenData?.userEndpointToken;
  }

  return jwtTokens.find(token => token.index === tokenIndex)?.userEndpointToken;
};
