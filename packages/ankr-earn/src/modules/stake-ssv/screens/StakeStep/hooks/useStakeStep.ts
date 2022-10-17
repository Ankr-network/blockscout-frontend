import { resetRequests, stopPolling } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { EthereumSSV } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { addTokenToWallet } from 'modules/stake-ssv/actions/addTokenToWallet';
import { getTxData } from 'modules/stake-ssv/actions/getTxData';
import { getTxReceipt } from 'modules/stake-ssv/actions/getTxReceipt';
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

  const {
    data: txData,
    error,
    loading: isLoading,
  } = useQuery({ type: getTxData });

  const { data: receipt } = useQuery({ type: getTxReceipt });

  const isPending = !!txData?.isPending;

  const txAmount = txData?.amount ? new BigNumber(txData.amount) : undefined;

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = (): void => {
    dispatch(addTokenToWallet(tokenOut as unknown as EthereumSSV.ESSVTokens));
  };

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  useProviderEffect(() => {
    dispatch(getTxData({ txHash }));
    dispatch(getTxReceipt({ txHash }));

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
    error: error || txFailError,
    isLoading,
    isPending,
    tokenName: tokenOut,
    transactionId: txHash,
    onAddTokenClick,
  };
};
