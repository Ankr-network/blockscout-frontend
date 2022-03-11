import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { getTxData } from 'modules/eth2Swap/actions/getTxData';
import { addEth2SwapTokenToWallet } from 'modules/eth2Swap/actions/wallet';
import { TSwapOption } from 'modules/eth2Swap/types';

import { TOKENS } from '../../const';

export interface ITransactionStepHookData {
  isLoading: boolean;
  txHash: string;
  symbol: TSwapOption;
  destinationAddress?: string;
  amount?: BigNumber;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

interface ISuccessPathParams {
  txHash: string;
  swapOption: TSwapOption;
}

export const useTransactionStepHook = (): ITransactionStepHookData => {
  const { txHash, swapOption } = useParams<ISuccessPathParams>();
  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const dispatchRequest = useDispatchRequest();

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
  }, [txHash]);

  const handleAddTokenToWallet = useCallback(() => {
    dispatchRequest(
      addEth2SwapTokenToWallet({
        swapOption: TOKENS[swapOption],
      }),
    );
  }, [swapOption, dispatchRequest]);

  return {
    txHash,
    symbol: TOKENS[swapOption],
    isLoading,
    error,
    amount: data?.amount,
    destinationAddress: data?.destinationAddress,
    handleAddTokenToWallet,
  };
};
