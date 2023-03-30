import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';

import { ONE, ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { IPendingTableRow } from 'modules/dashboard/components/PendingTable';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { useGetDashboardPendingDataQuery } from 'modules/stake-xdc/actions/getDashboardPendingData';
import { useGetXdcCertRatioQuery } from 'modules/stake-xdc/actions/getXdcCertRatio';
import { useGetXdcPendingHistoryQuery } from 'modules/stake-xdc/actions/getXdcPendingHistory';

import { usePendingHistory } from '../usePendingHistory';

const BLOCK_TIME: Seconds = 15;

interface IStakedXDCTxHistory {
  isHistoryDataLoading: boolean;
  pendingUnstakeHistory: IPendingTableRow[];
  pendingAmount: BigNumber;
}

export const useStakedXDCTxHistory = (): IStakedXDCTxHistory => {
  const { data: pendingHistory, isFetching: isHistoryDataLoading } =
    useGetXdcPendingHistoryQuery(undefined, {
      refetchOnMountOrArgChange: BLOCK_TIME,
    });

  const { data: certRatio = ONE } = useGetXdcCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: LONG_CACHE_TIME,
  });

  const { data: pendingAmount = ZERO } = useGetDashboardPendingDataQuery(
    undefined,
    { refetchOnMountOrArgChange: BLOCK_TIME },
  );

  const { pendingCertUnstakeHistory, pendingCertAmount } = usePendingHistory({
    unstakeHistory: pendingHistory?.unstakeHistory,
    certRatio,
    pendingAmount,
    bondTokenName: '',
    certTokenName: t('unit.ankrxdc'),
  });

  return {
    isHistoryDataLoading,
    pendingUnstakeHistory: pendingCertUnstakeHistory,
    pendingAmount: pendingCertAmount,
  };
};
