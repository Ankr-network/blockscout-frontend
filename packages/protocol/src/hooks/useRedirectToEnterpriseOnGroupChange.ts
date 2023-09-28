import { useEffect } from 'react';
import { useHistory } from 'react-router';

import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { EnterpriseRoutesConfig } from 'domains/enterprise/routes';
import { isReactSnap } from 'modules/common/utils/isReactSnap';

export const useRedirectToEnterpriseOnGroupChange = () => {
  const { push } = useHistory();
  const { isEnterpriseClient } = useEnterpriseClientStatus();

  useEffect(() => {
    if (isEnterpriseClient && !isReactSnap) {
      push(EnterpriseRoutesConfig.chains.generatePath());
    }
  }, [isEnterpriseClient, push]);
};
