import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetAvaxCertRatioQuery } from 'modules/stake-avax/actions/getAvaxCertRatio';
import { useGetAvaxPendingUnstakesQuery } from 'modules/stake-avax/actions/getAvaxPendingUnstakes';

import { SHORT_CACHE_TIME } from '../const';
import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const AvaxHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetAvaxCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: pendingUnstakes } = useGetAvaxPendingUnstakesQuery(undefined, {
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
