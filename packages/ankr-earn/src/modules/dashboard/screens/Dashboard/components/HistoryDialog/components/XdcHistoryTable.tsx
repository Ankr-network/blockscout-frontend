import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetDashboardPendingDataQuery } from 'modules/stake-xdc/actions/getDashboardPendingData';
import { useGetXdcCertRatioQuery } from 'modules/stake-xdc/actions/getXdcCertRatio';

import { SHORT_CACHE_TIME } from '../const';
import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const XdcHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetXdcCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: pendingUnstakes } = useGetDashboardPendingDataQuery(undefined, {
    refetchOnMountOrArgChange: SHORT_CACHE_TIME,
  });

  const { stakeTableData, unstakeTableData } = useHistoryTable({
    unstakeHistory,
    stakeHistory,
    pendingUnstakes,
    token,
    ratio,
  });

  return (
    <HistoryTable
      data={isUnstakedActive ? unstakeTableData : stakeTableData}
      token={getTokenName(token)}
    />
  );
};
