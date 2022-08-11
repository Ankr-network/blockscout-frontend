import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { fetchBalanceEndTime } from '../actions/fetchBalanceEndTime';

export interface BalanceEndTime {
  endTime: number;
  isLoading: boolean;
}

const actionType = fetchBalanceEndTime.toString();

export const useBalanceEndTime = (
  isConnected: boolean,
  needRequery?: boolean,
): BalanceEndTime => {
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
    if (isConnected || needRequery) {
      dispatch(fetchBalanceEndTime());
    }
  }, [dispatch, isConnected, needRequery]);

  return { endTime, isLoading: pristine && loading };
};
