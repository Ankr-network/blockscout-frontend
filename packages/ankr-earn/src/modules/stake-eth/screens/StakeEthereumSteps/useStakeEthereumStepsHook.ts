import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { TEthToken } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { addTokenToWallet } from 'modules/stake-eth/actions/addTokenToWallet';
import { getClaimableData } from 'modules/stake-eth/actions/getClaimableData';
import { getCommonData } from 'modules/stake-eth/actions/getCommonData';
import { getTxData, getTxReceipt } from 'modules/stake-eth/actions/getTxData';
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

interface IStakeSuccessParams {
  tokenOut: TEthToken;
  txHash: string;
}

export const useStakeEthereumStepsHook = (): IStakeEthereumStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const {
    loading: isLoading,
    data: txData,
    error,
  } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: commonData } = useQuery({
    type: getCommonData,
  });
  const { data: claimableData } = useQuery({
    type: getClaimableData,
  });

  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
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
    dispatchRequest(addTokenToWallet(tokenOut));
  };

  const calculatedAmount = useMemo(() => {
    const amount = txData?.amount;
    const ratio = commonData?.aETHcRatio;

    const claimedAmount =
      tokenOut === Token.aETHb
        ? claimableData?.claimableAETHB ?? ZERO
        : claimableData?.claimableAETHC ?? ZERO;

    if (!amount) {
      return undefined;
    }

    const shouldCalcForAethc = tokenOut === Token.aETHc && ratio;
    if (shouldCalcForAethc) {
      return amount.multipliedBy(ratio).plus(claimedAmount);
    }
    return amount.plus(claimedAmount);
  }, [
    txData?.amount,
    commonData?.aETHcRatio,
    claimableData?.claimableAETHB,
    claimableData?.claimableAETHC,
    tokenOut,
  ]);

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
