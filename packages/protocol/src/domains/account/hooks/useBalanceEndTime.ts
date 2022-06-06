import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchBalanceEndTime } from '../actions/fetchBalanceEndTime';

export interface BalanceEndTime {
  endTime: number;
  isLoading: boolean;
}

const actionType = fetchBalanceEndTime.toString();

export const useBalanceEndTime = (isConnected: boolean): BalanceEndTime => {
  const {
    data: endTime,
    loading,
    pristine,
  } = useQuery<number>({
    defaultData: -1,
    type: actionType,
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchBalanceEndTime());
    }
  }, [dispatch, isConnected]);

  return { endTime, isLoading: pristine && loading };
};
