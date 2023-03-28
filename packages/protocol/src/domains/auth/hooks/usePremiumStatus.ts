import { useEffect } from 'react';

import { Options } from 'hooks/useQueryEndpoint';
import { selectUserEndpointToken } from '../store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useLazyFetchPremiumStatusQuery } from '../actions/fetchPremiumStatus';

const options: Options['subscriptionOptions'] = {
  pollingInterval: 30_000,
};

export const usePremiumStatus = () => {
  const userEndpointToken = useAppSelector(selectUserEndpointToken);

  const [fetch, { data: status, isLoading }] =
    useLazyFetchPremiumStatusQuery(options);

  useEffect(() => {
    if (userEndpointToken) {
      const { unsubscribe } = fetch(userEndpointToken);

      return unsubscribe;
    }

    return () => {};
  }, [fetch, userEndpointToken]);

  return { status, isLoading };
};
