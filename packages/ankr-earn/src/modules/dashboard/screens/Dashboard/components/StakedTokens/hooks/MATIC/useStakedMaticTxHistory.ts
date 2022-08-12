import { useQuery } from '@redux-requests/react';
import { useCallback } from 'react';

import {
  EPolygonPoolEventsMap,
  ITxEventsHistoryGroupItem,
} from '@ankr.com/staking-sdk';
import { t } from 'common';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { ETH_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-matic/eth/actions/fetchTxHistory';
import { useAppDispatch } from 'store/useAppDispatch';

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
    data: data?.completedBond,
    type: EPolygonPoolEventsMap.Staking,
    network: ETH_NETWORK_BY_ENV,
  });

  const unstakedAMATICB = getCompletedTransactions({
    data: data?.completedBond,
    type: EPolygonPoolEventsMap.Unstaking,
    network: ETH_NETWORK_BY_ENV,
  });

  const stakedAMATICC = getCompletedTransactions({
    data: data?.completedCertificate,
    type: EPolygonPoolEventsMap.Staking,
    network: ETH_NETWORK_BY_ENV,
  });

  const unstakedAMATICC = getCompletedTransactions({
    data: data?.completedCertificate,
    type: EPolygonPoolEventsMap.Unstaking,
    network: ETH_NETWORK_BY_ENV,
  });

  const pendingUnstakeHistoryAMATICB = data?.pendingBond
    ? data.pendingBond.map((transaction, index) => {
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

  const pendingUnstakeHistoryAMATICC = data?.pendingCertificate
    ? data?.pendingCertificate.map((transaction, index) => {
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
      staked: stakedAMATICB,
      stakedToken: Token.aMATICb,
      unstaked: unstakedAMATICB,
      unstakedToken: Token.aMATICb,
    },
    transactionHistoryAMATICC: {
      staked: stakedAMATICC,
      stakedToken: Token.aMATICc,
      unstaked: unstakedAMATICC,
      unstakedToken: Token.aMATICc,
    },
    handleLoadTxHistory,
  };
};
