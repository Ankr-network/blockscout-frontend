import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { DEFAULT_ANKR_VALUE_STRING } from 'domains/account/actions/topUp/const';
import { useTopUpTransaction } from './useTopUpTransaction';

export const useAnkrInitialAmount = () => {
  const { amount = new BigNumber(0), isTopUpInProcess } = useTopUpTransaction();

  return useMemo(
    () => (isTopUpInProcess ? amount.toString(10) : DEFAULT_ANKR_VALUE_STRING),
    [amount, isTopUpInProcess],
  );
};
