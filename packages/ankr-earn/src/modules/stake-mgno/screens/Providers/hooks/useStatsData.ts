interface IStatsData {
  apyLoading: boolean;
  highestAPY: string;
  tvl: string;
  lockingPeriod: number;
  rewards24h?: string;
  rewards30d?: string;
  statsLoading: boolean;
}

export const useStatsData = (): IStatsData => {
  return {
    apyLoading: false,
    highestAPY: '0',
    tvl: '0',
    lockingPeriod: 0,
    rewards24h: '0',
    rewards30d: '0',
    statsLoading: false,
  };
};
