import { Route, RouteProps, useHistory } from 'react-router-dom';
import { OverlaySpinner } from '@ankr.com/ui';
import { useEffect } from 'react';
import { INDEX_PATH } from 'domains/chains/routes';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchPrivateChain } from 'domains/chains/actions/private/fetchPrivateChain';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const GuardPremiumEndpointRoute = (props: RouteProps) => {
  const history = useHistory();
  const { loading, hasPrivateAccess, isLoggedIn } = useAuth();
  const [, fetchChainState] = useQueryEndpoint(chainsFetchPrivateChain);

  const shouldRedirect =
    isLoggedIn &&
    !hasPrivateAccess &&
    fetchChainState?.data?.chain?.premiumOnly;

  useEffect(() => {
    if (shouldRedirect) {
      history.replace(INDEX_PATH);
    }
  }, [shouldRedirect, history]);

  if (loading) {
    return <OverlaySpinner />;
  }

  return shouldRedirect ? null : <Route {...props} />;
};
