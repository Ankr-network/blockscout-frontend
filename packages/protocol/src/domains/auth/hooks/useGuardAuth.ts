import { RouteProps, useHistory } from 'react-router';
import { useEffect, useMemo } from 'react';

import { PRICING_PATH } from 'domains/pricing/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export interface IGuardRoute extends RouteProps {
  hasCredentials: boolean;
  hasAuthData: boolean;
  isManualDisconnected: boolean;
}

export const useGuardAuth = ({
  hasCredentials,
  hasAuthData,
  isManualDisconnected,
}: IGuardRoute) => {
  const { address, loading } = useAuth();
  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  const shouldReplace = useMemo(
    () => !hasAuthData || isManualDisconnected,
    [hasAuthData, isManualDisconnected],
  );

  useEffect(() => {
    if (shouldReplace) {
      history.replace(PRICING_PATH);
    }
  }, [history, shouldReplace]);

  useOnMount(() => {
    if (!address || !hasCredentials) setBreadcrumbs([]);
  });

  return {
    loading,
    shouldReplace,
  };
};
