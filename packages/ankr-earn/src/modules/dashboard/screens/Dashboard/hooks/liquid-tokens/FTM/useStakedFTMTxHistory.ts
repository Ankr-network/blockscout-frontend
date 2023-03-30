import { t } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { useGetFtmCertRatioQuery } from 'modules/stake-fantom/actions/getFtmCertRatio';
import { useGetFtmPendingHistoryQuery } from 'modules/stake-fantom/actions/getFtmPendingHistory';
import { useGetFtmPendingUnstakesQuery } from 'modules/stake-fantom/actions/getFtmPendingUnstakes';

import { IPendingHistoryData, usePendingHistory } from '../usePendingHistory';

const BLOCK_TIME: Seconds = 3;

interface ITxHistoryData extends IPendingHistoryData {
  isHistoryDataLoading: boolean;
}

export const useStakedFTMTxHistory = (): ITxHistoryData => {
  const { data: pendingFtmHistory, isFetching: isHistoryDataLoading } =
    useGetFtmPendingHistoryQuery(undefined, {
      refetchOnMountOrArgChange: BLOCK_TIME,
    });

  const { data: certRatio = ONE } = useGetFtmCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: LONG_CACHE_TIME,
  });

  const { data: pendingAmount = ZERO } = useGetFtmPendingUnstakesQuery(
    undefined,
    { refetchOnMountOrArgChange: BLOCK_TIME },
  );

  const {
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  } = usePendingHistory({
    unstakeHistory: pendingFtmHistory?.unstakeHistory,
    certRatio,
    pendingAmount,
    bondTokenName: t('unit.aftmb'),
    certTokenName: t('unit.ankrftm'),
  });

  return {
    isHistoryDataLoading,
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  };
};
