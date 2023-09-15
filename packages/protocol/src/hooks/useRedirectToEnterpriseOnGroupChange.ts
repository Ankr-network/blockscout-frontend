import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';

export const useRedirectToEnterpriseOnGroupChange = () => {
  const { push } = useHistory();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  useEffect(() => {
    if (isEnterpriseClient) {
      push(EnterpriseRoutesConfig.chains.generatePath());
    }
  }, [isEnterpriseClient, push]);
};
