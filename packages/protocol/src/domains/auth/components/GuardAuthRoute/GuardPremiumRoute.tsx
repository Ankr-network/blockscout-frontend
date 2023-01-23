import { Route, useHistory } from 'react-router-dom';

import { useGuardAuth, IGuardRoute } from 'domains/auth/hooks/useGuardAuth';
import { OverlaySpinner } from '@ankr.com/ui';
import { PRICING_PATH } from 'domains/pricing/Routes';
import { useEffect } from 'react';

export const GuardPremiumRoute = ({
  hasPremium,
  hasAuthData,
  ...routeProps
}: IGuardRoute) => {
  const history = useHistory();
  const { loading } = useGuardAuth({
    hasPremium,
    hasAuthData,
  });

  useEffect(() => {
    if (!hasPremium) {
      history.replace(PRICING_PATH);
    }
  }, [history, hasPremium]);

  if (loading) {
    return <OverlaySpinner />;
  }

  return hasPremium ? <Route {...routeProps} /> : null;
};
