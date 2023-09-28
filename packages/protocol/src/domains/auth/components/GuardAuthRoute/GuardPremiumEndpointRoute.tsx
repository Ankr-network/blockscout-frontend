import { Route, RouteProps } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardPremiumRedirect } from 'domains/auth/hooks/useGuardPremiumRedirect';

export const GuardPremiumEndpointRoute = (props: RouteProps) => {
  const { loading } = useAuth();

  const { shouldRedirect } = useGuardPremiumRedirect();

  if (loading) {
    return <OverlaySpinner />;
  }

  return shouldRedirect ? null : <Route {...props} />;
};
