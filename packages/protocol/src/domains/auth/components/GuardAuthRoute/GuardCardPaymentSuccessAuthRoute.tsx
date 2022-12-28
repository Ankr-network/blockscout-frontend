import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { Spinner } from 'ui';
import { AccountRoutesConfig } from 'domains/account/Routes';

export const GuardCardPaymentSuccessAuthRoute = ({
  hasPremium,
  isManualDisconnected,
  hasAuthData,
  ...routeProps
}: IGuardRoute) => {
  const history = useHistory();

  useEffect(() => {
    if (hasPremium) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath());
    }
  }, [history, hasPremium]);

  const { loading } = useGuardAuth({
    hasAuthData,
    hasPremium,
    isManualDisconnected,
  });

  if (loading) {
    return <Spinner />;
  }

  return <Route {...routeProps} />;
};
