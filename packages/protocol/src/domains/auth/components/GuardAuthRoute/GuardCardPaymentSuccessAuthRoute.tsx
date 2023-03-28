import { useEffect, useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';
import { Route, useHistory } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { AccountRoutesConfig } from 'domains/account/Routes';
import { PostTopUpLocationState } from 'modules/layout/components/StatusTransitionDialog/types';

interface IGuardCardPaymentSuccessAuthRoute extends IGuardRoute {
  hasPrivateAccess: boolean;
  isUserEthAddressType: boolean;
}

export const GuardCardPaymentSuccessAuthRoute = ({
  hasAuthData,
  hasPremium,
  hasPrivateAccess,
  isUserEthAddressType,
  ...routeProps
}: IGuardCardPaymentSuccessAuthRoute) => {
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
