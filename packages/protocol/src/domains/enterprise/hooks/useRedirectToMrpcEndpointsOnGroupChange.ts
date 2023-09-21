import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

export const useRedirectToMrpcEndpointsOnGroupChange = () => {
  const { push } = useHistory();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  useEffect(() => {
    if (!isEnterpriseClient && !isReactSnap) {
      push(ChainsRoutesConfig.chains.generatePath());
    }
  }, [isEnterpriseClient, push]);
};
