import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';

import { TEthToken } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddETHTokenToWalletMutation } from 'modules/stake-eth/actions/addTokenToWallet';
import { useGetETHClaimableDataQuery } from 'modules/stake-eth/actions/getClaimableData';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import {
  useGetETHTxDataQuery,
  useGetETHTxReceiptQuery,
} from 'modules/stake-eth/actions/getTxData';
import { RoutesConfig } from 'modules/stake-eth/Routes';
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

export const useClaimEthereumSteps = (): IStakeEthereumStepsHook => {
  const { txHash, tokenOut, amount } = RoutesConfig.claimSteps.useParams();
  const [addTokenToWallet] = useAddETHTokenToWalletMutation();

  const { refetch: getETHClaimableDataRefetch } = useGetETHClaimableDataQuery();
  const { refetch: getETHCommonDataRefetch } = useGetETHCommonDataQuery();

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

  const dispatch = useAppDispatch();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  useProviderEffect(() => {
    getETHCommonDataRefetch();
    getETHClaimableDataRefetch();
  }, [dispatch, txHash, tokenOut]);

  const onAddTokenClick = () => {
    addTokenToWallet(tokenOut as TEthToken);
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
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
