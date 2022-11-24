import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { useAddSUITokenToWalletMutation } from 'modules/stake-sui/actions/addSUITokenToWallet';
import {
  useGetSUITxDataQuery,
  useGetSUITxReceiptQuery,
} from 'modules/stake-sui/actions/getTxData';

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

  const [addSUITokenToWallet] = useAddSUITokenToWalletMutation();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetSUITxDataQuery({ txHash });
  const { data: receipt } = useGetSUITxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const isPending = !receipt && !!data?.isPending;

  return {
    amount: ZERO,
    destination: ' ',
    transactionId: txHash,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: addSUITokenToWallet,
  };
};
