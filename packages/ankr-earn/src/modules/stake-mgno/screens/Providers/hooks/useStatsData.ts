interface IStatsData {
  highestAPY: string;
  tvl: string;
  lockingPeriod: number;
  rewards24h?: string;
  rewards30d?: string;
}

export const useStatsData = (): IStatsData => {
  return {
    highestAPY: '0',
    tvl: '0',
    lockingPeriod: 0,
    rewards24h: '0',
    rewards30d: '0',
  };
};
