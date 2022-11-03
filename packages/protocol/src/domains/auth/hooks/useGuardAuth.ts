import { useAuth } from 'domains/auth/hooks/useAuth';
import { PRICING_PATH } from 'domains/pricing/Routes';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useEffect, useMemo } from 'react';
import { RouteProps, useHistory } from 'react-router';

export interface IGuardRoute extends RouteProps {
  hasCredentials: boolean;
  hasAuthData: boolean;
  isManualDisconnected: boolean;
}

export function useGuardAuth({
  hasCredentials,
  hasAuthData,
  isManualDisconnected,
}: IGuardRoute) {
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
}
