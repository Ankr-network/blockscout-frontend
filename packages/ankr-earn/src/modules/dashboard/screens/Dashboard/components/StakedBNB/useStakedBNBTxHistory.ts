import { useQuery } from '@redux-requests/react';

import { AvailableWriteProviders } from 'provider/providerManager/types';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';
import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { ITxEventsHistoryData, ITxEventsHistoryGroupItem } from '../../types';

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
}

export const useStakedBNBTxHistory = (): ITxHistoryData => {
  const { data, loading: isHistoryDataLoading } =
    useQuery<ITxEventsHistoryData>({
      type: fetchTxHistory,
    });
  const { chainId: network } = useAuth(AvailableWriteProviders.ethCompatible);

  const staked = getCompletedTransactions({
    data: data?.completed,
    type: EBinancePoolEventsMap.StakePending,
    network,
  });

  const unstaked = getCompletedTransactions({
    data: data?.completed,
    type: EBinancePoolEventsMap.ClaimPending,
    network,
  });

  const pendingUnstake = data?.pending.filter(
    ({ txType }) => txType === EBinancePoolEventsMap.ClaimPending,
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

  return {
    txHistory: data,
    isHistoryDataLoading,
    pendingUnstakeHistory,
    hasHistory,
    transactionHistory: { token: Token.aBNBb, staked, unstaked },
  };
};
