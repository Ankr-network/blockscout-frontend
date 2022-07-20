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
    highestAPY: 0,
    tvl: '0m',
    tvlPercent: 0,
    lockingPeriod: 0,
    rewards24h: '0k',
    rewards30d: '0m',
  };
};
