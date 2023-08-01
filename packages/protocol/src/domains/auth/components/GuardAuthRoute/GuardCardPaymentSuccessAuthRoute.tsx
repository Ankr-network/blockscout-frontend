import { useEffect, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import { useGuardAuth } from 'domains/auth/hooks/useGuardAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';
import { useMyBundles } from 'domains/account/hooks/useMyBundles';

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

  const { hasAuthData, loading } = useGuardAuth();
  const { isLoaded, isSubscribed } = useMyBundles({
    skipFetching: !hasAuthData,
  });

  const isPageForbidden = useMemo(() => {
    const isFreeUserWithJWT = !hasPremium && hasPrivateAccess;

    return isFreeUserWithJWT;
  }, [hasPremium, hasPrivateAccess]);

  useEffect(() => {
    if (isPageForbidden && !loading && !isUninitialized && isLoaded) {
      history.replace(AccountRoutesConfig.accountDetails.generatePath(), {
        origin:
          isSubscribed && hasPremium
            ? undefined
            : AccountRoutesConfig.cardPaymentSuccess.path,
      });
    }
  }, [
    history,
    isPageForbidden,
    loading,
    isUninitialized,
    isSubscribed,
    isLoaded,
    hasPremium,
  ]);

  return loading ? <OverlaySpinner /> : <Route {...routeProps} />;
};
