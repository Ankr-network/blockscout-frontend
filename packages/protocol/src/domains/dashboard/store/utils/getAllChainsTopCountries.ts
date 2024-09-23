import { PrivateStatsInternal } from 'multirpc-sdk';

export const getAllChainsTopCountries = (stats: PrivateStatsInternal) =>
  Object.entries(stats).flatMap(
    ([, stat]) => stat?.countries_count?.top_countries || [],
  );
