import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { ZERO } from 'modules/common/const';

export interface IStakeStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  nodeProvider?: string;
  transactionId?: string;
  error?: Error;
}

interface IStakeStepsParams {
  txHash: string;
}

export const useStakeStepsHook = (): IStakeStepsHook => {
  const { txHash } = useParams<IStakeStepsParams>();

  return {
    amount: ZERO,
    isLoading: false,
    isPending: false,
    error: undefined,
    nodeProvider: 'test provider',
    transactionId: txHash,
  };
};
