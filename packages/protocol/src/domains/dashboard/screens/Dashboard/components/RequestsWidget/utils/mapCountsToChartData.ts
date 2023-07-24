import { PrivateStatCounts } from 'multirpc-sdk';

import { IChartData } from 'modules/common/components/Chart';

export const mapCountsToChartData = (
  counts?: PrivateStatCounts,
): IChartData[] | undefined => {
  return (
    counts &&
    Object.entries(counts).map(([timestamp, data]) => ({
      time: new Date(Number(timestamp)),
      value: data.count,
    }))
  );
};
