import { resetRequests, stopPolling } from '@redux-requests/core';
import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { TxErrorCodes } from 'modules/common/components/ProgressStep';
import { Token } from 'modules/common/types/token';
import { addBNBTokenToWallet } from 'modules/stake-bnb/actions/addBNBTokenToWallet';
import { fetchStats } from 'modules/stake-bnb/actions/fetchStats';
import { getTxData, getTxReceipt } from 'modules/stake-bnb/actions/getTxData';
import { AVAILABLE_BNB_SYNT_TOKENS } from 'modules/stake-bnb/const';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { MainRouteParams } from '../../types';

interface IMainDataBSC {
  isLoading: boolean;
  isPending: boolean;
  amount?: BigNumber;
  destination?: string;
  transactionId?: string;
  token: Token;
  error?: Error;
  handleAddTokenToWallet: () => void;
}

function isTBnbSyntToken(token: Token): token is TBnbSyntToken {
  return AVAILABLE_BNB_SYNT_TOKENS.includes(token as TBnbSyntToken);
}

export function useMainDataBSC(): IMainDataBSC {
  const dispatchRequest = useDispatchRequest();
  const dispatch = useAppDispatch();
  const { token, txHash } = useParams<MainRouteParams>();

  const { loading: isLoading, data, error } = useQuery({ type: getTxData });
  const { data: receipt } = useQuery({ type: getTxReceipt });
  const { data: stats } = useQuery({ type: fetchStats });

  const txFailError =
    receipt?.status === false ? new Error(TxErrorCodes.TX_FAILED) : undefined;

  const calculatedAmount = useMemo(() => {
    const amount = data?.amount;
    const relayerFee = stats?.relayerFee;
    if (!amount || !relayerFee) {
      return undefined;
    }

    return amount.minus(relayerFee);
  }, [data?.amount, stats?.relayerFee]);

  const isPending = !receipt && !!data?.isPending;

  const onAddTokenClick = () => {
    if (!isTBnbSyntToken(token)) {
      return;
    }

    dispatchRequest(addBNBTokenToWallet(token));
  };

  useProviderEffect(() => {
    dispatchRequest(getTxData({ txHash }));
    dispatchRequest(getTxReceipt({ txHash }));

    if (!stats) {
      dispatchRequest(fetchStats());
    }

    return () => {
      dispatch(resetRequests([getTxData.toString(), getTxReceipt.toString()]));
    };
  }, [dispatch, txHash]);

  useEffect(() => {
    if (!receipt) {
      return;
    }

    dispatch(stopPolling([getTxReceipt.toString()]));
  }, [dispatch, receipt]);

  return {
    token,
    isLoading,
    isPending,
    amount: calculatedAmount,
    destination: data?.destinationAddress,
    transactionId: txHash,
    error: error || txFailError,
    handleAddTokenToWallet: onAddTokenClick,
  };
}
