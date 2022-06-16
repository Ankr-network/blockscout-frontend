import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { ChainType, MethodRequest, Period } from 'domains/chains/types';
import { fetchMethodRequests } from 'domains/chains/actions/fetchMethodRequests';

export interface RequestsParams {
  chainType: ChainType;
  isConnected?: boolean;
  period: Period;
}

const actionType = fetchMethodRequests.toString();

export const useMethodRequests = ({
  isConnected,
  chainType,
  period,
}: RequestsParams): [MethodRequest[], boolean] => {
  const {
    data: requests,
    loading,
    pristine,
  } = useQuery<MethodRequest[]>({
    defaultData: [],
    type: actionType,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchMethodRequests(chainType, period));
    }
  }, [dispatch, chainType, isConnected, period, pristine]);

  return [requests, pristine && loading];
};
