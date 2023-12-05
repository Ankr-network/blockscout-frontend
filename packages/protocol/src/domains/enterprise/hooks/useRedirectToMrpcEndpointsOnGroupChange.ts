import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { isReactSnap } from 'modules/common/utils/isReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const useRedirectToMrpcEndpointsOnGroupChange = () => {
  const { push } = useHistory();
  const { isEnterpriseClient } = useEnterpriseClientStatus();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isEnterpriseClient && !isReactSnap) {
      push(ChainsRoutesConfig.chains.generatePath({ isLoggedIn }));
    }
  }, [isEnterpriseClient, isLoggedIn, push]);
};
