import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { BSC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { t } from 'modules/i18n/utils/intl';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { EBinancePoolEventsMap } from 'modules/stake-bnb/api/BinanceSDK';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { ITxEventsHistoryGroupItem } from '../../../../types';

interface IGetHistoryTransactionsArgs {
  type: EBinancePoolEventsMap;
  network?: number;
  data?: ITxEventsHistoryGroupItem[];
}

interface IUnstakeHistory {
  id: number;
  token: Token;
  amount: BigNumber;
  timerSlot: string;
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
  transactionHistoryABNBB: HistoryDialogData;
  transactionHistoryABNBC: HistoryDialogData;
  pendingUnstakeHistoryABNBB: IPendingTableRow[];
  pendingUnstakeHistoryABNBC: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  handleLoadTxHistory: () => void;
}

export const useStakedBNBTxHistory = (): ITxHistoryData => {
  const { data: txHistory, loading: isHistoryDataLoading } = useQuery({
    type: fetchTxHistory,
  });
  const dispatch = useAppDispatch();

  const stakedABNBB = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedABNBB,
      type: EBinancePoolEventsMap.Staked,
      network: BSC_NETWORK_BY_ENV as number,
    });
  }, [txHistory?.completedABNBB]);

  const stakedABNBC = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedABNBC,
      type: EBinancePoolEventsMap.Staked,
      network: BSC_NETWORK_BY_ENV as number,
    });
  }, [txHistory?.completedABNBC]);

  const unstakedABNBB = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedABNBB,
      type: EBinancePoolEventsMap.UnstakePending,
      network: BSC_NETWORK_BY_ENV as number,
    });
  }, [txHistory?.completedABNBB]);

  const unstakedABNBC = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedABNBC,
      type: EBinancePoolEventsMap.UnstakePending,
      network: BSC_NETWORK_BY_ENV as number,
    });
  }, [txHistory?.completedABNBC]);

  const preparePendingUnstakes = (
    pendingHistory: ITxEventsHistoryGroupItem[],
    token: TBnbSyntToken,
  ): IUnstakeHistory[] => {
    return pendingHistory
      ? pendingHistory.map((transaction, index) => {
          const date = t('format.date', { value: transaction.txDate });
          const time = t('format.time-short', { value: transaction.txDate });

          return {
            id: index + 1,
            token,
            amount: transaction.txAmount,
            timerSlot: `${date}, ${time}`,
          };
        })
      : [];
  };

  const pendingUnstakeHistoryABNBB = useMemo(
    () => preparePendingUnstakes(txHistory?.pendingABNBB ?? [], Token.aBNBb),
    [txHistory?.pendingABNBB],
  );
  const pendingUnstakeHistoryABNBC = useMemo(
    () => preparePendingUnstakes(txHistory?.pendingABNBC ?? [], Token.aBNBc),
    [txHistory?.pendingABNBC],
  );

  const hasHistory =
    !!stakedABNBB?.length ||
    !!stakedABNBC?.length ||
    !!unstakedABNBB?.length ||
    !!unstakedABNBC?.length;

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTxHistory());
  }, [dispatch]);

  return {
    isHistoryDataLoading,
    pendingUnstakeHistoryABNBB,
    pendingUnstakeHistoryABNBC,
    hasHistory,
    transactionHistoryABNBB: {
      token: Token.aBNBb,
      staked: stakedABNBB,
      unstaked: unstakedABNBB,
    },
    transactionHistoryABNBC: {
      token: Token.aBNBc,
      staked: stakedABNBC,
      unstaked: unstakedABNBC,
    },
    handleLoadTxHistory,
  };
};
