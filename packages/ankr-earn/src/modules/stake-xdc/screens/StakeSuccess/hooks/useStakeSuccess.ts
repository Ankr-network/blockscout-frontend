import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { XDC } from '@ankr.com/staking-sdk';

import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useLazyAddTokenToWalletQuery } from 'modules/stake-xdc/actions/addTokenToWallet';
import { useGetTxDataQuery } from 'modules/stake-xdc/actions/getTxData';
import { useGetTxReceiptQuery } from 'modules/stake-xdc/actions/getTxReceipt';
import { XDC_POLLING_INTERVAL } from 'modules/stake-xdc/const';
import { IRouteParams } from 'modules/stake-xdc/types';

interface IUseStakeSuccessData {
  amount?: BigNumber;
  destinationAddress?: string;
  error?: Error;
  isLoading: boolean;
  isPending: boolean;
  tokenName: XDC.EXDCTokens;
  transactionId?: string;
  onAddTokenClick: () => void;
}

export const useStakeSuccess = (): IUseStakeSuccessData => {
  const { txHash } = useParams<IRouteParams>();

  const [isReadyTx, setIsReadyTx] = useState(false);

  const {
    data: txData,
    error: txDataError,
    isFetching: isTxDataLoading,
  } = useGetTxDataQuery({ txHash });

  const { data: txReceiptData } = useGetTxReceiptQuery(
    { txHash },
    { pollingInterval: !isReadyTx ? XDC_POLLING_INTERVAL : undefined },
  );

  const [addTokenToWallet] = useLazyAddTokenToWalletQuery();

  const isPending = !txReceiptData && !!txData?.isPending;

  const txFailError =
    txReceiptData?.status === false
      ? new Error(TxErrorCodes.TX_FAILED)
      : undefined;

  const onAddTokenClick = (): void => {
    addTokenToWallet(XDC.EXDCTokens.aXDCc);
  };

  useEffect(() => {
    if (txReceiptData?.status) {
      setIsReadyTx(true);
    }
  }, [txReceiptData?.status]);

  return {
    amount: txData?.amount,
    destinationAddress: txData?.destinationAddress,
    error: (txDataError as Error) || txFailError,
    isLoading: isTxDataLoading,
    isPending,
    tokenName: XDC.EXDCTokens.aXDCc,
    transactionId: txHash,
    onAddTokenClick,
  };
};
