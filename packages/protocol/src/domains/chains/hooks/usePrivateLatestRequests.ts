import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { privateLatestRequests } from '../actions/private/fetchPrivateLatestRequests';

export interface PrivateLatestRequestsParams {
  hasPolling?: boolean;
}

const options: Options = {
  subscriptionOptions: {
    pollingInterval: 15_000,
  },
};

export const usePrivateLatestRequests = ({
  hasPolling = true,
}: PrivateLatestRequestsParams | void = {}) => {
  const [fetchPrivateLatestRequests, latestRequestsState, reset] =
    useQueryEndpoint(privateLatestRequests, hasPolling ? options : undefined);

  useEffect(() => reset, [reset]);

  useEffect(() => {
    const { unsubscribe } = fetchPrivateLatestRequests();

    return unsubscribe;
  }, [fetchPrivateLatestRequests]);

  return latestRequestsState;
};
