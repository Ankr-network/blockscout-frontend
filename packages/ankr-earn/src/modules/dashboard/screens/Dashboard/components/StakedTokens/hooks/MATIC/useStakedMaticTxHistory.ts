import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';

import { t } from 'common';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-polygon/actions/fetchTxHistory';
import { EPolygonPoolEventsMap } from 'modules/stake-polygon/api/PolygonSDK';
import { useAppDispatch } from 'store/useAppDispatch';

import { ITxEventsHistoryGroupItem } from '../../../../types';

interface IGetHistoryTransactionsArgs {
  type: EPolygonPoolEventsMap | string;
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
  transactionHistoryAMATICB: HistoryDialogData;
  transactionHistoryAMATICC: HistoryDialogData;
  pendingUnstakeHistoryAMATICB: IPendingTableRow[];
  pendingUnstakeHistoryAMATICC: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryDataLoading: boolean;
  handleLoadTxHistory: () => void;
}

export const useStakedMATICTxHistory = (): ITxHistoryData => {
  const { data, loading: isHistoryDataLoading } = useQuery({
    type: fetchTxHistory,
  });
  const dispatch = useAppDispatch();

  const stakedAMATICB = getCompletedTransactions({
    data: data?.completedAMATICB,
    type: EPolygonPoolEventsMap.Staking,
    network: ETH_NETWORK_BY_ENV,
  });

  const unstakedAMATICB = getCompletedTransactions({
    data: data?.completedAMATICB,
    type: EPolygonPoolEventsMap.Unstaking,
    network: ETH_NETWORK_BY_ENV,
  });

  const stakedAMATICC = getCompletedTransactions({
    data: data?.completedAMATICC,
    type: EPolygonPoolEventsMap.Staking,
    network: ETH_NETWORK_BY_ENV,
  });

  const unstakedAMATICC = getCompletedTransactions({
    data: data?.completedAMATICC,
    type: EPolygonPoolEventsMap.Unstaking,
    network: ETH_NETWORK_BY_ENV,
  });

  const pendingUnstakeHistoryAMATICB = data?.pendingAMATICB
    ? data?.pendingAMATICB.map((transaction, index) => {
        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aMATICb,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const pendingUnstakeHistoryAMATICC = data?.pendingAMATICC
    ? data?.pendingAMATICC.map((transaction, index) => {
        const date = t('format.date', { value: transaction.txDate });
        const time = t('format.time-short', { value: transaction.txDate });

        return {
          id: index + 1,
          token: Token.aMATICc,
          amount: transaction.txAmount,
          timerSlot: `${date}, ${time}`,
        };
      })
    : [];

  const hasHistory =
    !!stakedAMATICB?.length ||
    !!unstakedAMATICB?.length ||
    !!stakedAMATICC?.length ||
    !!unstakedAMATICC?.length;

  const handleLoadTxHistory = useCallback(() => {
    dispatch(fetchTxHistory());
  }, [dispatch]);

  return {
    isHistoryDataLoading,
    hasHistory,
    pendingUnstakeHistoryAMATICB,
    pendingUnstakeHistoryAMATICC,
    transactionHistoryAMATICB: {
      token: Token.aMATICb,
      staked: stakedAMATICB,
      unstaked: unstakedAMATICB,
    },
    transactionHistoryAMATICC: {
      token: Token.aMATICc,
      staked: stakedAMATICC,
      unstaked: unstakedAMATICC,
    },
    handleLoadTxHistory,
  };
};
