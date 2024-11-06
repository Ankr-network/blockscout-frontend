import { useEffect } from 'react';

import { Options, useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

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

  const { selectedGroupAddress: group } = useSelectedUserGroup();

  useEffect(() => reset, [reset]);

  useEffect(() => {
    const { unsubscribe } = fetchPrivateLatestRequests({ group });

    return unsubscribe;
  }, [fetchPrivateLatestRequests, group]);

  return latestRequestsState;
};
