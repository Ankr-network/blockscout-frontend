import { BlockchainID, PrivateStats } from 'multirpc-sdk';

export const compareBlockchainsTotalRequests =
  (stats?: PrivateStats) =>
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

    const a = +stats[i]!.total_requests;
    const b = +stats[j]!.total_requests;

    if (a < b) {
      return 1;
    }

    if (a > b) {
      return -1;
    }

    return 0;
  };
