import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';

import { Token } from 'modules/common/types/token';
import { useGetETHCommonDataQuery } from 'modules/stake-eth/actions/getCommonData';
import {
  useGetETHTxDataQuery,
  useGetETHTxReceiptQuery,
} from 'modules/stake-eth/actions/getTxData';
import { RoutesConfig } from 'modules/stake-eth/Routes';
import { getValidSelectedToken } from 'modules/stake-eth/utils/getValidSelectedToken';
import { UNSTAKE_TXN_FAIL_CODE } from 'modules/stake/components/UnstakeSuccess';

const nativeToken = Token.ETH;

const RECEIPT_POLLING_INTERVAL = 3_000;
const ZERO_POLLING_INTERVAL = 0;

export interface IUseUnstakeEthereumSteps {
  amount?: BigNumber;
  destination?: string;
  isLoading: boolean;
  isError: boolean;
  tokenName: string;
  transactionId?: string;
  error?: Error;
  isReceiptPending: boolean;
}

export const useUnstakeEthereumSteps = (): IUseUnstakeEthereumSteps => {
  const [pollingInterval, setPollingInterval] = useState(
    RECEIPT_POLLING_INTERVAL,
  );

  const { data: commonData, isFetching: isCommonDataLoading } =
    useGetETHCommonDataQuery();

  const {
    txHash,
    token,
    amount: queryAmount,
  } = RoutesConfig.unstakeSteps.useParams();

  const {
    isFetching: isTxDataLoading,
    data: txData,
    isError: isTxDataError,
    error: txDataError,
  } = useGetETHTxDataQuery({
    txHash,
    // TODO: need to check with real transaction
    shouldDecodeAmount: false,
  });

  const { data: receipt } = useGetETHTxReceiptQuery(
    { txHash },
    { pollingInterval },
  );

  const isValidQueryParams = !!txData && !isTxDataError;

  const isSuccessfulTx = receipt?.status === true;

  const shouldStopPolling = isSuccessfulTx || isTxDataError;

  const txFailError =
    receipt?.status === false ? new Error(UNSTAKE_TXN_FAIL_CODE) : undefined;

  const validToken = getValidSelectedToken(token);

  const isReceiptPending = !receipt && !!txData?.isPending;

  const amount = useMemo(() => {
    if (!queryAmount || isCommonDataLoading) {
      return undefined;
    }

    const value = new BigNumber(queryAmount);
    const isCertificate = validToken === Token.aETHc;

    if (isCertificate) {
      return value.dividedBy(commonData?.aETHcRatio || 1);
    }

    return value;
  }, [commonData?.aETHcRatio, isCommonDataLoading, queryAmount, validToken]);

  useEffect(() => {
    if (shouldStopPolling) {
      setPollingInterval(ZERO_POLLING_INTERVAL);
    }
  }, [shouldStopPolling]);

  return {
    amount,
    destination: txData?.destinationAddress,
    transactionId: isValidQueryParams ? txHash : undefined,
    tokenName: nativeToken,
    isLoading: isTxDataLoading,
    isReceiptPending,
    isError: isTxDataError,
    error: (txDataError as Error | undefined) || txFailError,
  };
};
