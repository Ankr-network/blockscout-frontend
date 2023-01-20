import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { Token } from 'modules/common/types/token';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { useGetDashboardPendingDataQuery } from 'modules/stake-xdc/actions/getDashboardPendingData';
import { useLazyGetDashboardTxEventsHistoryQuery } from 'modules/stake-xdc/actions/getDashboardTxEventsHistory';

interface IUseHistoryDialogData {
  isHistoryDataLoading: boolean;
  isOpenedHistory: boolean;
  isPendingUnstakeLoading: boolean;
  pendingUnstakeHistory: IPendingTableRow[];
  pendingValue: BigNumber;
  onCloseHistoryDialog: () => void;
  onLoadTxHistory: () => void;
  onOpenHistoryDialog: () => void;
}

export const useHistoryDialog = (): IUseHistoryDialogData => {
  const {
    isOpened: isOpenedHistory,
    onClose: onCloseHistoryDialog,
    onOpen: onOpenHistory,
  } = useDialog();

  const { data: pendingValue, isFetching: isPendingUnstakeLoading } =
    useGetDashboardPendingDataQuery();

  const [
    refetchTotalHistory,
    { data: historyData, isFetching: isHistoryDataLoading },
  ] = useLazyGetDashboardTxEventsHistoryQuery();

  const pendingUnstakeHistory = historyData?.pendingCertificate
    ? historyData.pendingCertificate.map(({ txAmount, txDate }, idx) => {
        const date = t('format.date', { value: txDate });
        const time = t('format.time-short', { value: txDate });

        return {
          amount: txAmount,
          id: idx + 1,
          timerSlot: `${date}, ${time}`,
          token: Token.ankrXDC,
        } as IPendingTableRow;
      })
    : [];

  const onLoadTxHistory = (): void => {
    refetchTotalHistory();
  };

  const onOpenHistoryDialog = (): void => {
    onOpenHistory();
  };

  return {
    isHistoryDataLoading,
    isOpenedHistory,
    isPendingUnstakeLoading,
    pendingUnstakeHistory,
    pendingValue: pendingValue ?? ZERO,
    onCloseHistoryDialog,
    onLoadTxHistory,
    onOpenHistoryDialog,
  };
};
