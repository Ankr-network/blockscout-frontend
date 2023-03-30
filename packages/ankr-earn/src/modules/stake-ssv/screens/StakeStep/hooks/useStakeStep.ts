import { resetRequests, stopPolling } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import { EthereumSSV } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { useAddSSVTokenToWalletMutation } from 'modules/stake-ssv/actions/addTokenToWallet';
import { useLazyGetSSVTxDataQuery } from 'modules/stake-ssv/actions/getSSVTxData';
import { useLazyGetSSVTxReceiptQuery } from 'modules/stake-ssv/actions/getSSVTxReceipt';
import { TSSVToken } from 'modules/stake-ssv/types';
import { useAppDispatch } from 'store/useAppDispatch';

interface IStakeStepRouteData {
  tokenOut: TSSVToken;
  txHash: string;
}

interface IUseStakeStepData {
  amount?: BigNumber;
  destinationAddress?: string;
  error?: Error;
  isLoading: boolean;
  isPending: boolean;
  tokenName: TSSVToken;
  transactionId?: string;
  onAddTokenClick: () => void;
}

export const useStakeStep = (): IUseStakeStepData => {
  const dispatch = useAppDispatch();

  const { tokenOut, txHash } = useParams<IStakeStepRouteData>();

  const [getTxData, { data: txData, error, isLoading }] =
    useLazyGetSSVTxDataQuery();

  const [getTxReceipt, { data: receipt }] = useLazyGetSSVTxReceiptQuery();

  const [addTokenToWallet] = useAddSSVTokenToWalletMutation();

  const isPending = !!txData?.isPending;

  const txAmount = txData?.amount ? new BigNumber(txData.amount) : undefined;

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = useCallback((): void => {
    addTokenToWallet(tokenOut as unknown as EthereumSSV.ESSVTokens);
  }, [addTokenToWallet, tokenOut]);

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, getTxReceipt, receipt]);

  useProviderEffect(() => {
    getTxData({ txHash });
    getTxReceipt({ txHash });

    return () => {
      dispatch(
        resetRequests([
          addTokenToWallet.toString(),
          getTxData.toString(),
          getTxReceipt.toString(),
        ]),
      );
    };
  }, [dispatch, txHash]);

  return {
    amount: txAmount,
    destinationAddress: txData?.destinationAddress,
    error: (error as Error) || txFailError,
    isLoading,
    isPending,
    tokenName: tokenOut,
    transactionId: txHash,
    onAddTokenClick,
  };
};
