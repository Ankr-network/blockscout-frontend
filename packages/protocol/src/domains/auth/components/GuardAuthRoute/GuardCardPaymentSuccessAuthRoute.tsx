import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { OverlaySpinner } from '@ankr.com/ui';
import { AccountRoutesConfig } from 'domains/account/Routes';

interface IGuardCardPaymentSuccessAuthRoute extends IGuardRoute {
  isUserEthAddressType: boolean;
}

export const GuardCardPaymentSuccessAuthRoute = ({
  hasPremium,
  hasAuthData,
  isUserEthAddressType,
  ...routeProps
}: IGuardCardPaymentSuccessAuthRoute) => {
  const history = useHistory();

  useEffect(() => {
    if (hasPremium && isUserEthAddressType) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath());
    }
  }, [history, hasPremium, isUserEthAddressType]);

  const { loading } = useGuardAuth({
    hasAuthData,
    hasPremium,
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  return <Route {...routeProps} />;
};
