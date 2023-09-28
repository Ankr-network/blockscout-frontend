import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { chainsFetchPrivateChain } from 'domains/chains/actions/private/fetchPrivateChain';
import { INDEX_PATH } from 'domains/chains/routes';

import { useAuth } from './useAuth';

export const useGuardPremiumRedirect = () => {
  const history = useHistory();
  const { hasPrivateAccess, isLoggedIn } = useAuth();
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

  return { shouldRedirect };
};
