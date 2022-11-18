import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { ZERO } from 'modules/common/const';

export interface IStakeSuiStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

interface IStakeSuccessParams {
  txHash: string;
  destination: string;
}

export const useStakeSuiStepsHook = (): IStakeSuiStepsHook => {
  const { txHash } = useParams<IStakeSuccessParams>();

  return {
    amount: ZERO,
    destination: ' ',
    transactionId: txHash,
    isLoading: false,
    isPending: false,
    error: undefined,
    handleAddTokenToWallet: () => null,
  };
};
