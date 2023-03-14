import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useSelectTokenSelector } from 'domains/jwtToken/hooks/useSelectTokenSelector';
import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';

export const useUserEndpointToken = () => {
  const { workerTokenData } = useAuth();
  const { tokenIndex } = useSelectTokenSelector();
  const { jwtTokens } = useJwtTokenManager();

  if (tokenIndex === PRIMARY_TOKEN_INDEX || !tokenIndex) {
    return workerTokenData?.userEndpointToken;
  }

  return jwtTokens.find(token => token.index === tokenIndex)?.userEndpointToken;
};
