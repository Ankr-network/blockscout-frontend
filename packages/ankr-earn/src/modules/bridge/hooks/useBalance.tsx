import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

import { fetchBalance } from '../actions/fetchBalance';

export const useBalance = (): BigNumber => {
  const { data } = useQuery({
    type: fetchBalance,
  });

  return data ?? ZERO;
};
