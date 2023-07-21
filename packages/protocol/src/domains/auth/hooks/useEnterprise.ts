import { useEffect } from 'react';

import { useLazyFetchIsEnterpriseClientQuery } from '../actions/fetchIsEnterpriseClient';
import { useAuth } from './useAuth';

export const IS_ENTERPISE_ENABLED = false;

export const useEnterprise = () => {
  const { isLoggedIn } = useAuth();

  const [fetch, { data }] = useLazyFetchIsEnterpriseClientQuery();

  useEffect(() => {
    if (isLoggedIn) {
      fetch();
    }
  }, [fetch, isLoggedIn]);

  return {
    isClient: IS_ENTERPISE_ENABLED ? data ?? false : IS_ENTERPISE_ENABLED,
  };
};
