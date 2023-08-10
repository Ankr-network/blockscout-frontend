import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { useSelectTopUpTransaction } from 'domains/account/hooks/useSelectTopUpTransaction';

export const useTopUpTransaction = () => {
  const transaction = useSelectTopUpTransaction();

  const isProcessing = Boolean(
    transaction?.allowanceTransactionHash || transaction?.topUpTransactionHash,
  );

  const amount = useMemo(
    () => new BigNumber(transaction?.amount ?? 0).toString(10),
    [transaction],
  );

  return { amount, isProcessing, transaction };
};
