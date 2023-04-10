import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { useGroupEndpointToken } from './useGroupEndpointToken';

export const useUserEndpointToken = () => {
  const { workerTokenData } = useAuth();
  const { tokenIndex } = useTokenManagerConfigSelector();
  const { jwtTokens } = useJwtTokenManager();
  const groupJwtToken = useGroupEndpointToken();

  if (groupJwtToken) {
    return groupJwtToken;
  }

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return workerTokenData?.userEndpointToken;
  }

  return jwtTokens.find(token => token.index === tokenIndex)?.userEndpointToken;
};
