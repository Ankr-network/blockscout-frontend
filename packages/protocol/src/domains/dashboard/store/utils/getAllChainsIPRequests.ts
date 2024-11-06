import { PrivateStats } from 'multirpc-sdk';

export const getAllChainsIPRequests = (stats: PrivateStats) =>
  Object.entries(stats).flatMap(([, stat]) => stat?.ips_count?.top_ips || []);
