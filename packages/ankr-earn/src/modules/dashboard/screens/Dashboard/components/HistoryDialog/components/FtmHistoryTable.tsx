import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetFtmCertRatioQuery } from 'modules/stake-fantom/actions/getFtmCertRatio';
import { useGetFtmPendingUnstakesQuery } from 'modules/stake-fantom/actions/getFtmPendingUnstakes';

import { SHORT_CACHE_TIME } from '../const';
import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const FtmHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetFtmCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: pendingUnstakes } = useGetFtmPendingUnstakesQuery(undefined, {
    refetchOnMountOrArgChange: SHORT_CACHE_TIME,
  });

  const { stakeTableData, unstakeTableData } = useHistoryTable({
    unstakeHistory,
    stakeHistory,
    pendingUnstakes,
    ratio,
    token,
  });

  return (
    <HistoryTable
      data={isUnstakedActive ? unstakeTableData : stakeTableData}
      token={getTokenName(token)}
    />
  );
};
