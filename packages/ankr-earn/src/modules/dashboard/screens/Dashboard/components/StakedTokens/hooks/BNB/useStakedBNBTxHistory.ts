import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback, useMemo } from 'react';

import { EBinancePoolEventsMap } from '@ankr.com/staking-sdk';
import { t } from 'common';

import { HistoryDialogData } from 'modules/common/components/HistoryDialog';
import { BSC_NETWORK_BY_ENV } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { fetchTxHistory } from 'modules/stake-bnb/actions/fetchTxHistory';
import { TBnbSyntToken } from 'modules/stake-bnb/types';
import { useAppDispatch } from 'store/useAppDispatch';

import { ITxEventsHistoryGroupItem } from '../../../../types';

interface IGetHistoryTransactionsArgs {
  type: EBinancePoolEventsMap;
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
      link: getTxLinkByNetwork(txHash, BSC_NETWORK_BY_ENV),
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
      data: txHistory?.completedBond,
      type: EBinancePoolEventsMap.Staked,
    });
  }, [txHistory?.completedBond]);

  const stakedABNBC = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedCertificate,
      type: EBinancePoolEventsMap.Staked,
    });
  }, [txHistory?.completedCertificate]);

  const unstakedABNBB = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedBond,
      type: EBinancePoolEventsMap.UnstakePending,
    });
  }, [txHistory?.completedBond]);

  const unstakedABNBC = useMemo(() => {
    return getCompletedTransactions({
      data: txHistory?.completedCertificate,
      type: EBinancePoolEventsMap.UnstakePending,
    });
  }, [txHistory?.completedCertificate]);

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
    () => preparePendingUnstakes(txHistory?.pendingBond ?? [], Token.aBNBb),
    [txHistory?.pendingBond],
  );

  const pendingUnstakeHistoryABNBC = useMemo(
    () =>
      preparePendingUnstakes(txHistory?.pendingCertificate ?? [], Token.aBNBc),
    [txHistory?.pendingCertificate],
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
      staked: stakedABNBB,
      stakedToken: Token.aBNBb,
      unstaked: unstakedABNBB,
      unstakedToken: Token.aBNBb,
    },
    transactionHistoryABNBC: {
      staked: stakedABNBC,
      stakedToken: Token.aBNBc,
      unstaked: unstakedABNBC,
      unstakedToken: Token.aBNBc,
    },
    handleLoadTxHistory,
  };
};
