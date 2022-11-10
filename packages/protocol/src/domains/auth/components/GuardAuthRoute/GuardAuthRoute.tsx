import React from 'react';
import { Route } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { PricingRoutes } from 'domains/pricing/Routes';
import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';

export const GuardAuthRoute = ({
  hasCredentials,
  hasAuthData,
  isManualDisconnected,
  ...routeProps
}: IGuardRoute) => {
  const { shouldReplace } = useGuardAuth({
    hasCredentials,
    hasAuthData,
    isManualDisconnected,
  });

  if (shouldReplace) {
    return (
      <DefaultLayout disableGutters>
        <PricingRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
