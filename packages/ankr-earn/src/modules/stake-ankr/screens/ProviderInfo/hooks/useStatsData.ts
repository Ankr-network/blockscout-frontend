import BigNumber from 'bignumber.js';

interface IStatsData {
  isLoading: boolean;
  data: {
    apy: BigNumber;
    stakedPool: BigNumber;
    stakedPoolPercent: BigNumber;
    nodes: number;
    sharedRevenue: BigNumber;
    onlineDays: number;
    latency: number;
    successRate: number;
    uptime: number;
  };
}

const DEMO_DATA = {
  apy: new BigNumber(3),
  stakedPool: new BigNumber(323139),
  stakedPoolPercent: new BigNumber(14),
  nodes: 33,
  sharedRevenue: new BigNumber(5534),
  onlineDays: 30,
  latency: 12,
  successRate: 80,
  uptime: 99,
};

export const useStatsData = (): IStatsData => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
