import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { IHistoryDialogRow } from 'modules/common/components/HistoryDialog';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { getTxHistoryETH } from 'modules/stake-eth/actions/getTxHistoryAETHB';
import { ITxEventsHistoryGroupItem } from 'modules/stake/api/getTxEventsHistoryGroup';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IUseStakedFTMTxHistory {
  stakedAETHB: IHistoryDialogRow[];
  stakedAETHC: IHistoryDialogRow[];
  pendingUnstakeHistory: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryLoading: boolean;
  pendingValue: BigNumber;
  handleLoadTxHistory: () => void;
}

const mapTxns = (data: ITxEventsHistoryGroupItem): IHistoryDialogRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, ETH_NETWORK_BY_ENV),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useStakedTxHistoryETH = (): IUseStakedFTMTxHistory => {
  const { data: historyData, loading: isHistoryLoading } = useQuery({
    type: getTxHistoryETH,
  });
  const dispatch = useAppDispatch();

  const stakedAETHB = historyData?.completedAETHB.map(mapTxns) ?? [];
  const stakedAETHC = historyData?.completedAETHC.map(mapTxns) ?? [];

  const pendingValue = historyData?.totalPending ?? ZERO;

  const hasHistory =
    !!stakedAETHB?.length || !pendingValue.isZero() || isHistoryLoading;

  const handleLoadTxHistory = useCallback(() => {
    dispatch(getTxHistoryETH());
  }, [dispatch]);

  return {
    hasHistory,
    stakedAETHB,
    stakedAETHC,
    isHistoryLoading,
    pendingUnstakeHistory: [],
    pendingValue,
    handleLoadTxHistory,
  };
};
