import { useHistory } from 'react-router';
import { useEffect } from 'react';

import { PRICING_PATH } from 'domains/pricing/Routes';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';
import { useOnMount } from 'modules/common/hooks/useOnMount';

export const useGuardAuth = () => {
  const { address, loading, hasPremium, isLoggedIn } = useAuth();

  const { setBreadcrumbs } = useBreadcrumbs();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace(PRICING_PATH);
    }
  }, [history, isLoggedIn]);

  useOnMount(() => {
    if (!address || !hasPremium) setBreadcrumbs([]);
  });

  return {
    loading,
    hasAuthData: isLoggedIn,
  };
};
