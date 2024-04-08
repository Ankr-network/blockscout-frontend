import { useEffect, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, RouteProps, useHistory } from 'react-router-dom';

import { useGuardAuth } from 'domains/auth/hooks/useGuardAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';
import { usePremiumStatusSubscription } from 'domains/auth/hooks/usePremiumStatusSubscription';
import {
  selectMyBundlesLoaded,
  selectHasMyBundles,
} from 'domains/account/store/selectors';
import { useAppSelector } from 'store/useAppSelector';

interface GuardCardPaymentSuccessAuthRouteProps extends RouteProps {
  hasPrivateAccess: boolean;
  hasPremium: boolean;
}

export const GuardCardPaymentSuccessAuthRoute = ({
  hasPremium,
  hasPrivateAccess,
  ...routeProps
}: GuardCardPaymentSuccessAuthRouteProps) => {
  const { isUninitialized } = usePremiumStatusSubscription();

  const history = useHistory<PostTopUpLocationState>();

  const { loading } = useGuardAuth();

  const isLoaded = useAppSelector(selectMyBundlesLoaded);
  const isSubscribed = useAppSelector(selectHasMyBundles);

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
