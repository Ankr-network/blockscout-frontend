import { BlockchainID, PrivateStatsInternal } from 'multirpc-sdk';

export const compareBlockchainsTotalRequests =
  (stats?: PrivateStatsInternal) =>
  (i: BlockchainID, j: BlockchainID): 1 | -1 | 0 => {
    if (!stats) {
      return 0;
    }

    if (!stats[i]) {
      return 1;
    }

    if (!stats[j]) {
      return -1;
    }

    const a = +stats[i]!.totalRequests;
    const b = +stats[j]!.totalRequests;

    if (a < b) {
      return 1;
    }

    if (a > b) {
      return -1;
    }

    return 0;
  };
