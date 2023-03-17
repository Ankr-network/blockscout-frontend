import { useEffect } from 'react';

import { useLazyInfrastructureFetchSecuritySettingsQuery } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { useSelectTokenSelector } from 'domains/jwtToken/hooks/useSelectTokenSelector';
import { useJwtTokenManager } from 'domains/jwtToken/hooks/useJwtTokenManager';

export const useSecuritySettings = (chainId: string) => {
  const { jwtTokens } = useJwtTokenManager();

  const [fetchSecuritySettings, state] =
    useLazyInfrastructureFetchSecuritySettingsQuery();

  const { tokenIndex } = useSelectTokenSelector();

  useEffect(() => {
    fetchSecuritySettings({
      chainId,
      selectedJwtTokenIndex: tokenIndex,
      jwtTokens,
    });
  }, [fetchSecuritySettings, chainId, tokenIndex, jwtTokens]);

  return { state };
};
