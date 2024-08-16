import { PrivateStatCounts, PrivateStatTimestamp } from 'multirpc-sdk';

export const mapUsageDataForChartWidget = (
  privateStatCounts?: PrivateStatCounts,
): Record<PrivateStatTimestamp, number> | undefined => {
  if (!privateStatCounts) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(privateStatCounts).map(([timestamp, { count }]) => [
      timestamp,
      count,
    ]),
  );
};
