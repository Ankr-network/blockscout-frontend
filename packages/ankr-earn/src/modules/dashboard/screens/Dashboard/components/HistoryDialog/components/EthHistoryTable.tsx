import { getTokenName } from 'modules/common/utils/getTokenName';
import { HistoryTable } from 'modules/dashboard/components/History';
import { useGetEthCertRatioQuery } from 'modules/stake-eth/actions/getEthCertRatio';

import { useHistoryTable } from '../hooks/useHistoryTable';
import { IHistoryTableProps } from '../types';

export const EthHistoryTable = ({
  unstakeHistory,
  stakeHistory,
  token,
  isUnstakedActive,
}: IHistoryTableProps): JSX.Element => {
  const { data: ratio } = useGetEthCertRatioQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const { stakeTableData, unstakeTableData } = useHistoryTable({
    unstakeHistory,
    stakeHistory,
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
