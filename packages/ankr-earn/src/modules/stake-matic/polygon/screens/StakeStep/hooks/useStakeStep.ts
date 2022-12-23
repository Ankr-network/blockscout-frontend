import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { useAddMaticOnPolygonTokenToWalletMutation } from 'modules/stake-matic/polygon/actions/useAddMaticOnPolygonTokenToWalletMutation';
import {
  useGetMaticOnPolygonTxDataQuery,
  useGetMaticOnPolygonTxReceiptQuery,
} from 'modules/stake-matic/polygon/actions/useGetMaticOnPolygonTxDataQuery';
import { POLLING_INTERVAL } from 'modules/stake-matic/polygon/const';

interface IStakeStepRouteData {
  tokenOut: TMaticSyntToken;
  txHash: string;
}

interface IUseStakeStepData {
  amount?: BigNumber;
  destinationAddress?: string;
  error?: FetchBaseQueryError | Error;
  isLoading: boolean;
  isPending: boolean;
  tokenName: string;
  transactionId?: string;
  onAddTokenClick: () => void;
}

export const useStakeStep = (): IUseStakeStepData => {
  const [addMATICTokenToWallet] = useAddMaticOnPolygonTokenToWalletMutation();

  const { txHash, tokenOut } = useParams<IStakeStepRouteData>();

  const {
    isFetching: isLoading,
    data: txData,
    error,
  } = useGetMaticOnPolygonTxDataQuery({ txHash });
  const { data: receipt } = useGetMaticOnPolygonTxReceiptQuery(
    { txHash },
    {
      pollingInterval: POLLING_INTERVAL,
    },
  );
  const isPending = !!txData?.isPending;

  const txAmount = txData?.amount ? new BigNumber(txData.amount) : undefined;

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = (): void => {
    addMATICTokenToWallet(tokenOut);
  };

  return {
    amount: txAmount,
    destinationAddress: txData?.destinationAddress,
    error: (error as FetchBaseQueryError) || txFailError,
    isLoading,
    isPending,
    tokenName: tokenOut,
    transactionId: txHash,
    onAddTokenClick,
  };
};
