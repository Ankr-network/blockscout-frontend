import { useEffect, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import { useGuardAuth } from 'domains/auth/hooks/useGuardAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';

interface GuardCardPaymentSuccessAuthRouteProps extends RouteProps {
  hasPrivateAccess: boolean;
  hasPremium: boolean;
  isUninitialized: boolean;
}

export const GuardCardPaymentSuccessAuthRoute = ({
  hasPremium,
  hasPrivateAccess,
  isUninitialized,
  ...routeProps
}: GuardCardPaymentSuccessAuthRouteProps) => {
  const history = useHistory<PostTopUpLocationState>();

  const { loading } = useGuardAuth();

  const isPageForbidden = useMemo(() => {
    const isFreeUserWithJWT = !hasPremium && hasPrivateAccess;

    return isFreeUserWithJWT;
  }, [hasPremium, hasPrivateAccess]);

  useEffect(() => {
    if (isPageForbidden && !loading && !isUninitialized) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath(), {
        origin: AccountRoutesConfig.cardPaymentSuccess.path,
      });
    }
  }, [history, isPageForbidden, loading, isUninitialized]);

  return loading ? <OverlaySpinner /> : <Route {...routeProps} />;
};
