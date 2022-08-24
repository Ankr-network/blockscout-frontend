import { MATIC_DECIMALS } from '@ankr.com/staking-sdk/src/modules/matic/const';
import { resetRequests, stopPolling } from '@redux-requests/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TMaticSyntToken } from 'modules/stake-matic/common/types';
import { addMATICTokenToWallet } from 'modules/stake-matic/polygon/actions/addMATICTokenToWallet';
import { getCommonData } from 'modules/stake-matic/polygon/actions/getCommonData';
import { getStakeStats } from 'modules/stake-matic/polygon/actions/getStakeStats';
import { getTxData } from 'modules/stake-matic/polygon/actions/getTxData';
import { getTxReceipt } from 'modules/stake-matic/polygon/actions/getTxReceipt';
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

  const { data: stats } = useQuery({ type: getStakeStats });
  const { data: commonData } = useQuery({ type: getCommonData });
  const {
    loading: isLoading,
    data: txData,
    error,
  } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });

  const isPending = !receipt && !!txData?.isPending;

  const txAmount = useMemo(() => {
    const amount = txData?.amount;
    const ratio = commonData?.ratio;
    const feePct = stats?.stakeFeePct ?? ZERO;

    if (!amount) {
      return undefined;
    }

    const isActiveForAC = tokenOut === Token.aMATICc && !!ratio;

    return isActiveForAC
      ? amount
          .minus(amount.multipliedBy(feePct))
          .multipliedBy(ratio)
          .decimalPlaces(MATIC_DECIMALS, BigNumber.ROUND_DOWN)
      : amount;
  }, [txData?.amount, commonData, stats?.stakeFeePct, tokenOut]);

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const onAddTokenClick = (): void => {
    dispatch(addMATICTokenToWallet(tokenOut));
  };

  useEffect(() => {
    if (receipt) {
      dispatch(stopPolling([getTxReceipt.toString()]));
    }
  }, [dispatch, receipt]);

  useProviderEffect(() => {
    if (!stats) {
      dispatch(getStakeStats());
    }

    dispatch(getCommonData());
    dispatch(getTxData({ txHash }));
    dispatch(getTxReceipt({ txHash }));

    return () => {
      dispatch(
        resetRequests([
          getStakeStats.toString(),
          getTxData.toString(),
          getTxReceipt.toString(),
          getCommonData.toString(),
        ]),
      );
    };
  }, [dispatch, stats, txHash]);

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
