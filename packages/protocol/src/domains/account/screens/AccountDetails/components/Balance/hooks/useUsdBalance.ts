import BigNumber from 'bignumber.js';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import { useEffect } from 'react';

import { IRates, fetchRates } from 'modules/common/actions/fetchRates';

export interface UsdBalance {
  balance: BigNumber;
  isLoading: boolean;
}

export const useUsdBalance = (
  isConnected: boolean,
  ankrBalance: BigNumber,
): UsdBalance => {
  const {
    data: rates,
    loading,
    pristine,
  } = useQuery<IRates | null>({
    type: fetchRates.toString(),
  });

  const dispatch = useDispatchRequest();

  useEffect(() => {
    if (isConnected) {
      dispatch(fetchRates());
    }
  }, [dispatch, isConnected]);

  return {
    balance: rates?.ankrUsdt?.multipliedBy(ankrBalance) || new BigNumber(0),
    isLoading: pristine && loading,
  };
};
