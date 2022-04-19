import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';

import { AvailableWriteProviders } from 'provider';

import { useAuth } from 'modules/auth/hooks/useAuth';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { t } from 'modules/i18n/utils/intl';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { useAppDispatch } from 'store/useAppDispatch';

import {
  ITxEventsHistoryData,
  ITxEventsHistoryGroupItem,
} from '../../../../types';

interface IGetHistoryTransactionsArgs {
  type: EBinancePoolEventsMap;
  network?: number;
  data?: ITxEventsHistoryGroupItem[];
}

const getCompletedTransactions = ({
  data,
  network,
  type,
}: IGetHistoryTransactionsArgs):
  | HistoryDialogData['staked']
  | HistoryDialogData['unstaked'] => {
  if (!data) return [];

  return data
    .filter(({ txType }) => txType === type)
    .map(({ txDate, txHash, txAmount }) => ({
      date: txDate,
      hash: txHash,
      link: network ? getTxLinkByNetwork(txHash, network) : '',
      amount: txAmount,
    }));
};

export interface ITxHistoryData {
  txHistory: ITxEventsHistoryData | null;
  pendingUnstakeHistory: IPendingTableRow[];
  transactionHistory: HistoryDialogData;
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  handleLoadTxHistory: () => void;
}

export const useStakedBNBTxHistory = (): ITxHistoryData => {
  const { data: txHistory, loading: isHistoryDataLoading } = useQuery({
    type: fetchTxHistory,
  });
  const { chainId: network } = useAuth(AvailableWriteProviders.ethCompatible);
  const dispatch = useAppDispatch();

  const staked = getCompletedTransactions({
    data: txHistory?.completed,
    type: EBinancePoolEventsMap.Staked,
    network: network as number,
  });

  const unstaked = getCompletedTransactions({
    data: txHistory?.completed,
    type: EBinancePoolEventsMap.UnstakePending,
    network: network as number,
  });

  const pendingUnstake = txHistory?.pending.filter(
    ({ txType }) => txType === EBinancePoolEventsMap.UnstakePending,
  );

  const pendingUnstakeHistory = pendingUnstake
    ? pendingUnstake.map((transaction, index) => {
        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aBNBb,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const hasHistory = !!staked?.length || !!unstaked?.length;

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTxHistory());
  }, [dispatch]);

  return {
    txHistory,
    isHistoryDataLoading,
    pendingUnstakeHistory,
    hasHistory,
    transactionHistory: { token: Token.aBNBb, staked, unstaked },
    handleLoadTxHistory,
  };
};
