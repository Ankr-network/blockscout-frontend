import { t } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { useGetBnbCertRatioQuery } from 'modules/stake-bnb/actions/getBnbCertRatio';
import { useGetBnbPendingHistoryQuery } from 'modules/stake-bnb/actions/getBnbPendingHistory';
import { useGetBnbPendingUnstakesQuery } from 'modules/stake-bnb/actions/getBnbPendingUnstakes';

import { IPendingHistoryData, usePendingHistory } from '../usePendingHistory';

const BLOCK_TIME: Seconds = 3;

export interface IStakedBNBTxHistory extends IPendingHistoryData {
  isHistoryDataLoading: boolean;
}

export const useStakedBNBTxHistory = (): IStakedBNBTxHistory => {
  const { data: pendingBnbHistory, isFetching: isHistoryDataLoading } =
    useGetBnbPendingHistoryQuery(undefined, {
      refetchOnMountOrArgChange: BLOCK_TIME,
    });

  const { data: certRatio = ONE } = useGetBnbCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: LONG_CACHE_TIME,
  });

  const { data: pendingAmount = ZERO } = useGetBnbPendingUnstakesQuery(
    undefined,
    { refetchOnMountOrArgChange: BLOCK_TIME },
  );

  const {
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  } = usePendingHistory({
    unstakeHistory: pendingBnbHistory?.unstakeHistory,
    certRatio,
    pendingAmount,
    bondTokenName: t('unit.abnbb'),
    certTokenName: t('unit.ankrbnb'),
  });

  return {
    isHistoryDataLoading,
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  };
};
