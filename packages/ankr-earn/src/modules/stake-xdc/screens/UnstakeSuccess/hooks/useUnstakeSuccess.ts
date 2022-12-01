import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Token } from 'modules/common/types/token';
import { useGetTxDataQuery } from 'modules/stake-xdc/actions/getTxData';
import { useGetTxReceiptQuery } from 'modules/stake-xdc/actions/getTxReceipt';
import { XDC_POLLING_INTERVAL } from 'modules/stake-xdc/const';
import { IRouteParams } from 'modules/stake-xdc/types';
import { useUnstakePendingTimestamp } from 'modules/stake/hooks/useUnstakePendingTimestamp';

interface IUseUnstakeSuccessData {
  amount?: BigNumber;
  destinationAddress?: string;
  infoLabel: string;
  title?: string;
  tokenName: Token;
  transactionHash?: string;
}

const TOKEN_OUT = Token.XDC;

export const useUnstakeSuccess = (): IUseUnstakeSuccessData => {
  const { txHash } = useParams<IRouteParams>();

  const [isReadyTx, setIsReadyTx] = useState(false);

  const { data: txData } = useGetTxDataQuery({
    isUnstake: true,
    txHash,
  });

  const { data: txReceiptData } = useGetTxReceiptQuery(
    { txHash },
    { pollingInterval: !isReadyTx ? XDC_POLLING_INTERVAL : undefined },
  );

  const { label: unstakeLabel } = useUnstakePendingTimestamp({
    token: TOKEN_OUT,
  });

  const isPending = !txReceiptData && !!txData?.isPending;

  const infoLabel = isPending ? unstakeLabel : '';

  const title = isPending ? undefined : t('stake-xdc.unstake.success-title');

  useEffect(() => {
    if (txReceiptData?.status) {
      setIsReadyTx(true);
    }
  }, [txReceiptData?.status]);

  return {
    amount: txData?.amount,
    destinationAddress: txData?.destinationAddress,
    infoLabel,
    title,
    tokenName: TOKEN_OUT,
    transactionHash: txHash,
  };
};
