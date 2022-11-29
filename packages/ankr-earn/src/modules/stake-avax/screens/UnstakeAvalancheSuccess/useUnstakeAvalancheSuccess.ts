import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { useAddAVAXTokenToWalletMutation } from 'modules/stake-avax/actions/addAVAXTokenToWallet';
import {
  useGetAVAXTxDataQuery,
  useGetAVAXTxReceiptQuery,
} from 'modules/stake-avax/actions/getTxData';
import { TAvaxSyntToken } from 'modules/stake-avax/types';

export interface IUnstakeAvalancheSuccessHook {
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
  token: TAvaxSyntToken;
  txHash: string;
}

export const useUnstakeAvalancheSuccess = (): IUnstakeAvalancheSuccessHook => {
  const { txHash, token } = useParams<IUnstakeSuccessParams>();
  const {
    isFetching: isLoading,
    data,
    error,
  } = useGetAVAXTxDataQuery({ txHash });
  const { data: receipt } = useGetAVAXTxReceiptQuery(
    { txHash },
    {
      pollingInterval: 3_000,
    },
  );
  const [addAVAXTokenToWallet] = useAddAVAXTokenToWalletMutation();

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = () => {
    addAVAXTokenToWallet(token);
  };

  const amount = data?.amount ?? ZERO;

  const isPending = !receipt && !!data?.isPending;

  return {
    amount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    tokenName: token,
    isLoading,
    isPending,
    error: (error as FetchBaseQueryError) || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
};
