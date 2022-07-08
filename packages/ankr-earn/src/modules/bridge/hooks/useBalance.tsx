import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

import { fetchBalance } from '../actions/fetchBalance';

interface IUseBalanceData {
  balance: BigNumber;
  isBalanceLoading: boolean;
}

export const useBalance = (): IUseBalanceData => {
  const { data, loading: isBalanceLoading } = useQuery({
    type: fetchBalance,
  });

  return {
    balance: data ?? ZERO,
    isBalanceLoading,
  };
};
