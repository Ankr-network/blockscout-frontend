import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetMaticOnEthCertRatioQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthCertRatio';
import { useGetMaticOnEthPendingUnstakesQuery } from 'modules/stake-matic/eth/actions/getMaticOnEthPendingUnstakes';

import { SHORT_CACHE_TIME } from '../const';
import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const MaticOnEthHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetMaticOnEthCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: pendingUnstakes } = useGetMaticOnEthPendingUnstakesQuery(
    undefined,
    { refetchOnMountOrArgChange: SHORT_CACHE_TIME },
  );

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
