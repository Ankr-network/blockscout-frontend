import { t } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { useGetMaticOnEthCertRatioQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthCertRatio';
import { useGetMaticOnEthPendingHistoryQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthPendingHistory';
import { useGetMaticOnEthPendingUnstakesQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthPendingUnstakes';

import { IPendingHistoryData, usePendingHistory } from '../usePendingHistory';

const BLOCK_TIME: Seconds = 15;

export interface IStakedMaticTxHistory extends IPendingHistoryData {
  isHistoryDataLoading: boolean;
}

export const useStakedMaticTxHistory = (): IStakedMaticTxHistory => {
  const { data: pendingHistory, isFetching: isHistoryDataLoading } =
    useGetMaticOnEthPendingHistoryQuery(undefined, {
      refetchOnMountOrArgChange: BLOCK_TIME,
    });

  const { data: certRatio = ONE } = useGetMaticOnEthCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: LONG_CACHE_TIME,
  });

  const { data: pendingAmount = ZERO } = useGetMaticOnEthPendingUnstakesQuery(
    undefined,
    { refetchOnMountOrArgChange: BLOCK_TIME },
  );

  const {
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  } = usePendingHistory({
    unstakeHistory: pendingHistory?.unstakeHistory,
    certRatio,
    pendingAmount,
    bondTokenName: t('unit.amaticb'),
    certTokenName: t('unit.ankrmatic'),
  });

  return {
    isHistoryDataLoading,
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  };
};
