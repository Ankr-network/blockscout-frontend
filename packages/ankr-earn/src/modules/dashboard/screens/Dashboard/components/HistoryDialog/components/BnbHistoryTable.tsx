import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetBnbCertRatioQuery } from 'modules/stake-bnb/actions/getBnbCertRatio';
import { useGetBnbPendingUnstakesQuery } from 'modules/stake-bnb/actions/getBnbPendingUnstakes';

import { SHORT_CACHE_TIME } from '../const';
import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const BnbHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetBnbCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { data: pendingUnstakes } = useGetBnbPendingUnstakesQuery(undefined, {
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
