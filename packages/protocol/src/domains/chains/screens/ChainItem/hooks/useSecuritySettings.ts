import { useEffect } from 'react';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import { useLazyInfrastructureFetchSecuritySettingsQuery } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';
import { fetchAllJwtTokenRequests } from 'domains/jwtToken/action/getAllJwtToken';

export const useSecuritySettings = (chainId: string) => {
  const [, { data: { jwtTokens } = { jwtTokens: [] } }] = useQueryEndpoint(
    fetchAllJwtTokenRequests,
  );

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
