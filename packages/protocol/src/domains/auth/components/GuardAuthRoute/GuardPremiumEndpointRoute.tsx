import { Route, RouteProps, useHistory } from 'react-router-dom';
import { Spinner } from 'ui';
import { useEffect } from 'react';
import { INDEX_PATH } from 'domains/chains/routes';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchChain } from 'domains/chains/actions/fetchChain';
import { useAuth } from 'domains/auth/hooks/useAuth';

export const GuardPremiumEndpointRoute = (props: RouteProps) => {
  const history = useHistory();
  const { loading, hasPrivateAccess } = useAuth();
  const [, fetchChainState] = useQueryEndpoint(chainsFetchChain);

  useEffect(() => {
    if (!hasPrivateAccess && fetchChainState?.data?.chain?.premiumOnly) {
      history.replace(INDEX_PATH);
    }
  }, [hasPrivateAccess, fetchChainState, history]);

  if (loading) {
    return <Spinner />;
  }

  return <Route {...props} />;
};
