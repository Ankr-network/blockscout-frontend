import { resetRequests } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { addMATICTokenToWallet } from 'modules/stake-matic/polygon/actions/addMATICTokenToWallet';
import { getTxData } from 'modules/stake-matic/polygon/actions/getTxData';
import { useAppDispatch } from 'store/useAppDispatch';

interface IStakeStepRouteData {
  tokenOut: TMaticSyntToken;
  txHash: string;
}

interface IUseStakeStepData {
  amount?: BigNumber;
  destinationAddress?: string;
  error?: Error;
  isLoading: boolean;
  isPending: boolean;
  tokenName: string;
  transactionId?: string;
  onAddTokenClick: () => void;
}

export const useStakeStep = (): IUseStakeStepData => {
  const dispatch = useAppDispatch();

  const { txHash, tokenOut } = useParams<IStakeStepRouteData>();

  const {
    loading: isLoading,
    data: txData,
    error,
  } = useQuery({ type: getTxData });

  const isPending = !!txData?.isPending;

  const txAmount = txData?.amount ? new BigNumber(txData.amount) : undefined;

  const txFailError =
    txData?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = (): void => {
    dispatch(addMATICTokenToWallet(tokenOut));
  };

  useProviderEffect(() => {
    dispatch(
      getTxData({
        token: tokenOut,
        txHash,
      }),
    );

    return () => {
      dispatch(resetRequests([getTxData.toString()]));
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
