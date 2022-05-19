import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useCallback } from 'react';

import { IHistoryDialogRow } from 'modules/common/components/HistoryDialog';
import { FTM_NETWORK_BY_ENV, ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { t } from 'modules/i18n/utils/intl';
import { getHistory } from 'modules/stake-fantom/actions/getHistory';
import { ITxEventsHistoryGroupItem } from 'modules/stake/api/getTxEventsHistoryGroup';
import { useAppDispatch } from 'store/useAppDispatch';

export interface IUseStakedFTMTxHistory {
  staked: IHistoryDialogRow[];
  unstaked: IHistoryDialogRow[];
  pendingUnstakeHistory: IPendingTableRow[];
  hasHistory: boolean;
  isHistoryLoading: boolean;
  pendingValue: BigNumber;
  handleLoadTxHistory: () => void;
}

const mapTxns = (data: ITxEventsHistoryGroupItem): IHistoryDialogRow => {
  return {
    date: data.txDate,
    link: getTxLinkByNetwork(data.txHash, FTM_NETWORK_BY_ENV),
    hash: data.txHash,
    amount: data.txAmount,
  };
};

export const useStakedFTMTxHistory = (): IUseStakedFTMTxHistory => {
  const { data: historyData, loading: isHistoryLoading } = useQuery({
    type: getHistory,
  });
  const dispatch = useAppDispatch();

  const mapPending = (data: ITxEventsHistoryGroupItem): IPendingTableRow => {
    const date = t('format.date', { value: data.txDate });
    const time = t('format.time-short', { value: data.txDate });

    return {
      id: data.txDate.getTime(),
      token: Token.aFTMb,
      amount: data.txAmount,
      timerSlot: `${date}, ${time}`,
    };
  };

  const staked = historyData?.stakeEvents.map(mapTxns) ?? [];
  const unstaked = historyData?.withdrawnEvents.map(mapTxns) ?? [];
  const pendingUnstakeHistory =
    historyData?.pendingEvents.map(mapPending) ?? [];

  const pendingValue = historyData?.totalPending ?? ZERO;

  const hasHistory =
    !!staked?.length ||
    !!unstaked?.length ||
    !pendingValue.isZero() ||
    isHistoryLoading;

  const handleLoadTxHistory = useCallback(() => {
    dispatch(getHistory());
  }, [dispatch]);

  return {
    hasHistory,
    staked,
    unstaked,
    isHistoryLoading,
    pendingUnstakeHistory,
    pendingValue,
    handleLoadTxHistory,
  };
};
