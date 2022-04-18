import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';

import { TEthToken } from 'modules/api/EthSDK';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { addTokenToWallet } from 'modules/stake-eth/actions/addTokenToWallet';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTxData, getTxReceipt } from 'modules/stake-eth/actions/getTxData';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeEthereumStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

export const useClaimEthereumSteps = (): IStakeEthereumStepsHook => {
  const { txHash, tokenOut, amount } = RoutesConfig.claimSteps.useParams();

  const {
    loading: isLoading,
    data: txData,
    error,
  } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });

  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash, shouldDecodeAmount: false }));
    dispatchRequest(getTxReceipt({ txHash }));
    dispatchRequest(getCommonData());

    return () => {
      dispatch(
        resetRequests([
          getTxData.toString(),
          getTxReceipt.toString(),
          getCommonData.toString(),
        ]),
      );
    };
  }, [dispatch, txHash, tokenOut]);

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  const onAddTokenClick = () => {
    dispatchRequest(addTokenToWallet(tokenOut as TEthToken));
  };

  const calculatedAmount = amount ? new BigNumber(amount) : undefined;

  const isPending = !receipt && !!txData?.isPending;

  return {
    amount: calculatedAmount,
    destination: txData?.destinationAddress,
    transactionId: txHash,
    tokenName: tokenOut,
    isLoading,
    isPending,
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
