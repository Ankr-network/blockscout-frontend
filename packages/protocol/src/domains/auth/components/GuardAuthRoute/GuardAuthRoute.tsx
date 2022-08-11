import React, { useEffect, useMemo } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useHistory } from 'react-router';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/Breadcrumbs';
import { useOnMount } from 'modules/common/hooks/useOnMount';
import { PricingRoutes, PRICING_PATH } from 'domains/pricing/Routes';

export interface IGuardRoute extends RouteProps {
  hasAuthData: boolean;
  isManualDisconnected: boolean;
}

export const GuardAuthRoute = ({
  hasAuthData,
  isManualDisconnected,
  ...routeProps
}: IGuardRoute) => {
  const { credentials, address } = useAuth();
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
    if (!address || !credentials) setBreadcrumbs([]);
  });

  if (shouldReplace) {
    return (
      <DefaultLayout>
        <PricingRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
