interface IStatsData {
  highestAPY: number;
  tvl: string;
  tvlPercent: number;
  lockingPeriod: number;
  rewards24h: string;
  rewards30d: string;
}

export const useStatsData = (): IStatsData => {
  return {
    highestAPY: 11,
    tvl: '56m',
    tvlPercent: 13,
    lockingPeriod: 90,
    rewards24h: '87k',
    rewards30d: '3.1m',
  };
};
