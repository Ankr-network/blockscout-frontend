import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { useAddBNBTokenToWalletMutation } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import {
  useGetBNBTxReceiptQuery,
  useGetBNBUnstakeTxDataQuery,
} from 'modules/stake-bnb/actions/getTxData';
import { TBnbSyntToken } from 'modules/stake-bnb/types';

export interface IUnstakeBinanceSuccessHook {
  isLoading: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  tokenName: string;
  error?: FetchBaseQueryError | Error;
  handleAddTokenToWallet: () => void;
}

interface IUnstakeSuccessParams {
  token: TBnbSyntToken;
  txHash: string;
}

export const useUnstakeBinanceSuccessHook = (): IUnstakeBinanceSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();

  const {
    isFetching: isbnbUnstakeTxDataLoading,
    data: bnbUnstakeTxData,
    error,
  } = useGetBNBUnstakeTxDataQuery({ txHash });

  const { data: bnbTxReceipt } = useGetBNBTxReceiptQuery(
    { txHash },
    { pollingInterval: 3_000 },
  );

  const [addBNBTokenToWallet] = useAddBNBTokenToWalletMutation();

  const txFailError =
    bnbTxReceipt?.status === false
      ? new Error(TxErrorCodes.TX_FAILED)
      : undefined;

  const onAddTokenClick = () => {
    addBNBTokenToWallet(token);
  };

  return {
    amount: bnbUnstakeTxData?.amount,
    isLoading: isbnbUnstakeTxDataLoading,
    destination: bnbUnstakeTxData?.destinationAddress,
    transactionId: txHash,
    tokenName: getTokenName(token),
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
