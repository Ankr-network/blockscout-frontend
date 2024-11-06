import { PrivateStats } from 'multirpc-sdk';

export const getAllChainsTopCountries = (stats: PrivateStats) =>
  Object.entries(stats).flatMap(
    ([, stat]) => stat?.countries_count?.top_countries || [],
  );
