import BigNumber from 'bignumber.js';
import { useCallback, useState } from 'react';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { IHistoryDialogRow } from 'modules/common/components/HistoryDialog/types';
import { ETH_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { useLazyGetETHTotalHistoryQuery } from 'modules/stake-eth/actions/getTotalHistory';

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
  const [isInit, setIsInit] = useState(true);
  const [historyRefetch, { data: historyData, isFetching: isHistoryLoading }] =
    useLazyGetETHTotalHistoryQuery();

  const stakedAETHB = historyData?.completedBond.map(mapTxns) ?? [];
  const stakedAETHC = historyData?.completedCertificate.map(mapTxns) ?? [];

  const pendingValue = ZERO;

  const hasHistory =
    !!stakedAETHB?.length || !pendingValue.isZero() || isHistoryLoading;

  useProviderEffect(() => {
    if (!isInit) {
      historyRefetch();
    }
    setIsInit(false);
  }, []);

  const handleLoadTxHistory = useCallback(() => {
    historyRefetch();
  }, [historyRefetch]);

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
