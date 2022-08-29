import { PROVIDER_STATS } from '../const';

export const getProviderStatsUrl = (provider: string): string =>
  `${PROVIDER_STATS}${provider}`;
