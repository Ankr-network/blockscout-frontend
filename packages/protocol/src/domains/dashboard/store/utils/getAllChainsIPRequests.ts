import { PrivateStatsInternal } from 'multirpc-sdk';

export const getAllChainsIPRequests = (stats: PrivateStatsInternal) =>
  Object.entries(stats).flatMap(([, stat]) => stat?.ips_count?.top_ips || []);
