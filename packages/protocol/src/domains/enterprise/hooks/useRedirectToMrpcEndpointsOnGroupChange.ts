import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { ChainsRoutesConfig } from 'domains/chains/routes';

export const useRedirectToMrpcEndpointsOnGroupChange = () => {
  const { push } = useHistory();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  useEffect(() => {
    if (!isEnterpriseClient) {
      push(ChainsRoutesConfig.chains.generatePath());
    }
  }, [isEnterpriseClient, push]);
};
