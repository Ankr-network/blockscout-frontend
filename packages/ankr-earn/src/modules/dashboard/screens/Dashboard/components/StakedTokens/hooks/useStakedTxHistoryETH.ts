import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';

import { IHistoryDialogRow } from 'modules/common/components/HistoryDialog';
import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { getTxHistoryETH } from 'modules/stake-eth/actions/getTxHistoryAETHB';
import { ITxEventsHistoryGroupItem } from 'modules/stake/api/getTxEventsHistoryGroup';

export interface IUseStakedFTMTxHistory {
  stakedAETHB: IHistoryDialogRow[];
  stakedAETHC: IHistoryDialogRow[];
  pendingUnstakeHistory: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryLoading: boolean;
  pendingValue: BigNumber;
}

const mapTxns = (data: ITxEventsHistoryGroupItem): IHistoryDialogRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, FTM_NETWORK_BY_ENV),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useStakedTxHistoryETH = (): IUseStakedFTMTxHistory => {
  const { data: historyData, loading: isHistoryLoading } = useQuery({
    type: getTxHistoryETH,
  });

  const stakedAETHB = historyData?.completedAETHB.map(mapTxns) ?? [];
  const stakedAETHC = historyData?.completedAETHC.map(mapTxns) ?? [];

  const pendingValue = historyData?.totalPending ?? ZERO;

  const hasHistory =
    !!stakedAETHB?.length || !pendingValue.isZero() || isHistoryLoading;

  return {
    hasHistory,
    stakedAETHB,
    stakedAETHC,
    isHistoryLoading,
    pendingUnstakeHistory: [],
    pendingValue,
  };
};
