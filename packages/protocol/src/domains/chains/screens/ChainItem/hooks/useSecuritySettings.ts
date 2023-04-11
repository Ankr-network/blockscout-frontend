import { useEffect } from 'react';
import { useLazyInfrastructureFetchSecuritySettingsQuery } from 'domains/infrastructure/actions/fetchSecuritySettings';
import { useJwtTokenForWorkerRequests } from './useJwtToken';

export const useSecuritySettings = (chainId: string) => {
  const { jwtToken = '' } = useJwtTokenForWorkerRequests();

  const [fetchSecuritySettings, state] =
    useLazyInfrastructureFetchSecuritySettingsQuery();

  useEffect(() => {
    fetchSecuritySettings({
      chainId,
      jwtToken,
    });
  }, [fetchSecuritySettings, chainId, jwtToken]);

  return { state };
};
