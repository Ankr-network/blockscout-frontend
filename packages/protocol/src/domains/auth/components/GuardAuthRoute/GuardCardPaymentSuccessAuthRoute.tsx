import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

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

  useEffect(() => {
    if (hasCredentials) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath());
    }
  }, [history, hasCredentials]);

  const { loading } = useGuardAuth({
    hasCredentials,
    hasAuthData,
    isManualDisconnected,
  });

  if (loading) {
    return <Spinner />;
  }

  return <Route {...routeProps} />;
};
