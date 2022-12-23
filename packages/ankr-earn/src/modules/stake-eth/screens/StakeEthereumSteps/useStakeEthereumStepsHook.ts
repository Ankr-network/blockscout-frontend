import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { useParams } from 'react-router';

import { TEthToken } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ACTION_CACHE_SEC, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import {
  useGetETHTxDataQuery,
  useGetETHTxReceiptQuery,
} from 'modules/stake-eth/actions/getTxData';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IStakeEthereumStepsHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

interface IStakeSuccessParams {
  tokenOut: TEthToken;
  txHash: string;
}

export const useStakeEthereumStepsHook = (): IStakeEthereumStepsHook => {
  const { txHash, tokenOut } = useParams<IStakeSuccessParams>();
  const [addTokenToWallet] = useAddETHTokenToWalletMutation();
  const {
    isFetching: isLoading,
    data: txData,
    error,
  } = useGetETHTxDataQuery({ txHash, shouldDecodeAmount: false });
  const { data: receipt } = useGetETHTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );
  const { data: commonData, refetch: getETHCommonDataRefetch } =
    useGetETHCommonDataQuery(undefined, {
      refetchOnMountOrArgChange: ACTION_CACHE_SEC,
    });

  const { data: claimableData } = useGetETHClaimableDataQuery(undefined, {
    refetchOnMountOrArgChange: ACTION_CACHE_SEC,
  });

  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    getETHCommonDataRefetch();
  }, [dispatch, txHash, tokenOut]);

  const onAddTokenClick = () => {
    addTokenToWallet(tokenOut);
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
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
