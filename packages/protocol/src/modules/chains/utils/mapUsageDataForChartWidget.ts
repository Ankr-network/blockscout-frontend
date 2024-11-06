import { BlockchainStatsCounts, BlockchainStatsTimestamp } from 'multirpc-sdk';

export const mapUsageDataForChartWidget = (
  privateStatCounts?: BlockchainStatsCounts,
): Record<BlockchainStatsTimestamp, number> | undefined => {
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
