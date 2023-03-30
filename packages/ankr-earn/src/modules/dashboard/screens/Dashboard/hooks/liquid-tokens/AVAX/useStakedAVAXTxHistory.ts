import { t } from '@ankr.com/common';

import { ONE, ZERO } from 'modules/common/const';
import { Seconds } from 'modules/common/types';
import { LONG_CACHE_TIME } from 'modules/stake-ankr/const';
import { useGetAvaxCertRatioQuery } from 'modules/stake-avax/actions/getAvaxCertRatio';
import { useGetAvaxPendingHistoryQuery } from 'modules/stake-avax/actions/getAvaxPendingHistory';
import { useGetAvaxPendingUnstakesQuery } from 'modules/stake-avax/actions/getAvaxPendingUnstakes';

import { IPendingHistoryData, usePendingHistory } from '../usePendingHistory';

const BLOCK_TIME: Seconds = 5;

export interface IStakedAVAXTxHistory extends IPendingHistoryData {
  isHistoryDataLoading: boolean;
}

export const useStakedAVAXTxHistory = (): IStakedAVAXTxHistory => {
  const { data: pendingAvaxHistory, isFetching: isHistoryDataLoading } =
    useGetAvaxPendingHistoryQuery(undefined, {
      refetchOnMountOrArgChange: BLOCK_TIME,
    });

  const { data: certRatio = ONE } = useGetAvaxCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: LONG_CACHE_TIME,
  });

  const { data: pendingAmount = ZERO } = useGetAvaxPendingUnstakesQuery(
    undefined,
    { refetchOnMountOrArgChange: BLOCK_TIME },
  );

  const {
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  } = usePendingHistory({
    unstakeHistory: pendingAvaxHistory?.unstakeHistory,
    certRatio,
    pendingAmount,
    bondTokenName: t('unit.aavaxb'),
    certTokenName: t('unit.ankravax'),
  });

  return {
    isHistoryDataLoading,
    pendingBondUnstakeHistory,
    pendingCertUnstakeHistory,
    pendingBondAmount,
    pendingCertAmount,
  };
};
