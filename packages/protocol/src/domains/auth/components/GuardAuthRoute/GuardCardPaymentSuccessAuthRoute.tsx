import { useEffect, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import {
  useGuardAuth,
  GuardAuthRouteParams,
} from 'domains/auth/hooks/useGuardAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';

interface GuardCardPaymentSuccessAuthRouteProps
  extends GuardAuthRouteParams,
    RouteProps {
  hasPrivateAccess: boolean;
  isUserEthAddressType: boolean;
}

export const GuardCardPaymentSuccessAuthRoute = ({
  hasAuthData,
  hasPremium,
  hasPrivateAccess,
  isUserEthAddressType,
  ...routeProps
}: GuardCardPaymentSuccessAuthRouteProps) => {
  const history = useHistory<PostTopUpLocationState>();

  const isPageForbidden = useMemo(() => {
    const isFreeUserWithJWT = !hasPremium && hasPrivateAccess;
    const isPremiumUserWithJWT = hasPremium && isUserEthAddressType;

    return isFreeUserWithJWT || isPremiumUserWithJWT;
  }, [isUserEthAddressType, hasPremium, hasPrivateAccess]);

  useEffect(() => {
    if (isPageForbidden) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath(), {
        origin: AccountRoutesConfig.cardPaymentSuccess.path,
      });
    }
  }, [history, isPageForbidden]);

  const { loading } = useGuardAuth({
    hasAuthData,
    hasPremium,
  });

  if (loading) {
    return <OverlaySpinner />;
  }

  return <Route {...routeProps} />;
};
