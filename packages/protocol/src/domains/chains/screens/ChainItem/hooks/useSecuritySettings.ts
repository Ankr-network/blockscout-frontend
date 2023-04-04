import { useEffect } from 'react';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

import {
  IUserJwtToken,
  fetchAllJwtTokenRequests,
} from 'domains/jwtToken/action/getAllJwtToken';
import { useLazyInfrastructureFetchSecuritySettingsQuery } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { useTokenManagerConfigSelector } from 'domains/jwtToken/hooks/useTokenManagerConfigSelector';

const defaultJWTTokens: IUserJwtToken = { jwtTokens: [] };

export const useSecuritySettings = (chainId: string) => {
  const [, { data: { jwtTokens } = defaultJWTTokens }] = useQueryEndpoint(
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
