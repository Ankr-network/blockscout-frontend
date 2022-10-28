import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { PricingRoutes } from 'domains/pricing/Routes';
import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { Spinner } from 'ui';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const GuardCardPaymentSuccessAuthRoute = ({
  hasCredentials,
  hasAuthData,
  isManualDisconnected,
  ...routeProps
}: IGuardRoute) => {
  const history = useHistory();
  const { shouldReplace, loading } = useGuardAuth({
    hasCredentials,
    hasAuthData,
    isManualDisconnected,
  });

  if (loading) {
    return <Spinner />;
  }

  if (hasCredentials) {
    history.replace(AccountRoutesConfig.accountDetails.generatePath());
  }

  if (shouldReplace) {
    return (
      <DefaultLayout disableGutters>
        <PricingRoutes />
      </DefaultLayout>
    );
  }

  return <Route {...routeProps} />;
};
