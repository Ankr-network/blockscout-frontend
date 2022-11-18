import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import {
  useGetFTMTxDataQuery,
  useGetFTMTxReceiptQuery,
} from 'modules/stake-fantom/actions/getTxData';
import { TFtmSyntToken } from 'modules/stake-fantom/types/TFtmSyntToken';

export interface IStakeFantomStepsHook {
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
  txHash: string;
  tokenOut: TFtmSyntToken;
  destination: string;
}

export const useStakeFantomStepsHook = (): IStakeFantomStepsHook => {
  const { txHash, tokenOut = Token.aFTMb } = useParams<IStakeSuccessParams>();

  const [addFTMTokenToWallet] = useAddFTMTokenToWalletMutation();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetFTMTxDataQuery({ txHash });
  const { data: receipt } = useGetFTMTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = () => {
    addFTMTokenToWallet(tokenOut);
  };

  const isPending = !receipt && !!data?.isPending;

  return {
    amount: data?.amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: tokenOut,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
