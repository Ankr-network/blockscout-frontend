import { RouteProps, useHistory } from 'react-router';
import { useEffect } from 'react';

import { PRICING_PATH } from 'domains/pricing/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface IGuardRoute extends RouteProps {
  hasPremium: boolean;
  isManualDisconnected: boolean;
  hasAuthData: boolean;
}

export const useGuardAuth = ({
  hasAuthData,
  hasPremium,
  isManualDisconnected,
}: IGuardRoute) => {
  const { address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  const shouldReplace = !hasAuthData || isManualDisconnected;

  useEffect(() => {
    if (shouldReplace) {
      history.replace(PRICING_PATH);
    }
  }, [history, shouldReplace]);

  useOnMount(() => {
    if (!address || !hasPremium) setBreadcrumbs([]);
  });

  return {
    loading,
  };
};
