import { useEffect } from 'react';

import { useLazyInfrastructureFetchSecuritySettingsQuery } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

export const useSecuritySettings = (chainId: string) => {
  const { jwtTokens } = useJwtTokenManager();

  const [fetchSecuritySettings, state] =
    useLazyInfrastructureFetchSecuritySettingsQuery();

  const { tokenIndex } = useTokenManagerConfigSelector();

  useEffect(() => {
    fetchSecuritySettings({
      chainId,
      selectedJwtTokenIndex: tokenIndex,
      jwtTokens,
    });
  }, [fetchSecuritySettings, chainId, tokenIndex, jwtTokens]);

  return { state };
};
