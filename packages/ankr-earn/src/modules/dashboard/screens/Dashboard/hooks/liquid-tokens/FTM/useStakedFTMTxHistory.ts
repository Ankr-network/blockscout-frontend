import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { IHistoryTableRow } from 'modules/dashboard/types';
import { useLazyGetFTMTotalHistoryDataQuery } from 'modules/stake-fantom/actions/getTotalHistoryData';

export interface IUseStakedFTMTxHistory {
  stakedAFTMB: IHistoryTableRow[];
  stakedAFTMC: IHistoryTableRow[];
  unstakedAFTMB: IHistoryTableRow[];
  unstakedAFTMC: IHistoryTableRow[];
  pendingUnstakeHistoryAFTMB: IPendingTableRow[];
  pendingUnstakeHistoryAFTMC: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryLoading: boolean;
  pendingValue: BigNumber;
  handleLoadTxHistory: () => void;
}

const mapTxns = (data: ITxEventsHistoryGroupItem): IHistoryTableRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, FTM_NETWORK_BY_ENV),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useStakedFTMTxHistory = (
  token: Token.aFTMb | Token.aFTMc,
): IUseStakedFTMTxHistory => {
  const [
    refetchTotalHistory,
    { data: historyData, isFetching: isHistoryLoading },
  ] = useLazyGetFTMTotalHistoryDataQuery();

  const mapPending = (data: ITxEventsHistoryGroupItem): IPendingTableRow => {
    const date = t('format.date', { value: data.txDate });
    const time = t('format.time-short', { value: data.txDate });

    return {
      id: data.txDate.getTime(),
      token,
      amount: data.txAmount,
      timerSlot: `${date}, ${time}`,
    };
  };

  const stakedAFTMB = historyData?.stakeEventsAFTMB.map(mapTxns) ?? [];
  const stakedAFTMC = historyData?.stakeEventsAFTMC.map(mapTxns) ?? [];
  const unstakedAFTMB = historyData?.withdrawnEventsAFTMB.map(mapTxns) ?? [];
  const unstakedAFTMC = historyData?.withdrawnEventsAFTMC.map(mapTxns) ?? [];
  const pendingUnstakeHistoryAFTMB =
    historyData?.pendingEventsAFTMB.map(mapPending) ?? [];
  const pendingUnstakeHistoryAFTMC =
    historyData?.pendingEventsAFTMC.map(mapPending) ?? [];

  const pendingValue = historyData?.totalPending ?? ZERO;

  const hasHistory =
    !!stakedAFTMB?.length ||
    !!unstakedAFTMB?.length ||
    !pendingValue.isZero() ||
    isHistoryLoading;

  const handleLoadTxHistory = useCallback(() => {
    refetchTotalHistory();
  }, [refetchTotalHistory]);

  return {
    hasHistory,
    stakedAFTMB,
    stakedAFTMC,
    unstakedAFTMB,
    unstakedAFTMC,
    isHistoryLoading,
    pendingUnstakeHistoryAFTMB,
    pendingUnstakeHistoryAFTMC,
    pendingValue,
    handleLoadTxHistory,
  };
};
