import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { useAddFTMTokenToWalletMutation } from 'modules/stake-fantom/actions/addFTMTokenToWallet';
import {
  useGetFTMTxDataQuery,
  useGetFTMTxReceiptQuery,
} from 'modules/stake-fantom/actions/getTxData';
import { TFtmSyntToken } from 'modules/stake-fantom/types/TFtmSyntToken';

export interface IUnstakeFantomSuccessHook {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError;
  handleAddTokenToWallet: () => void;
}

interface IUnstakeSuccessParams {
  token: TFtmSyntToken;
  txHash: string;
}

export const useUnstakeFantomSuccessHook = (): IUnstakeFantomSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
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

  const [addFTMTokenToWallet] = useAddFTMTokenToWalletMutation();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = () => {
    addFTMTokenToWallet(token);
  };

  const amount = data?.amount ?? ZERO;

  const isPending = !receipt && !!data?.isPending;

  return {
    amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: getTokenName(token),
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
