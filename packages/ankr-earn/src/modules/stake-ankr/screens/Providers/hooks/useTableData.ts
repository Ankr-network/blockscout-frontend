import BigNumber from 'bignumber.js';

interface ITableData {
  isLoading: boolean;
  data: {
    provider: string;
    nodeAmount: number;
    apy: number;
    stakedPool: number;
    stakedPoolPercent: number;
    rps: BigNumber;
    online: number;
    status?: string;
    stakeLink?: string;
    detailsLink?: string;
    exitDays?: number;
    bondingDays?: number;
  }[];
}

export const useTableData = (): ITableData => {
  return {
    isLoading: false,
    data: [
      {
        provider: 'Node Provider 1',
        nodeAmount: 6,
        apy: 12,
        stakedPool: 4544,
        stakedPoolPercent: 23,
        rps: new BigNumber(11920),
        online: 37,
        status: 'green',
        exitDays: 1,
      },
      {
        provider: 'Node Provider 2',
        nodeAmount: 2,
        apy: 13,
        stakedPool: 3244,
        stakedPoolPercent: 14,
        rps: new BigNumber(10202),
        online: 31,
        status: 'orange',
        stakeLink: 'stakeLink',
        detailsLink: 'detailsLink',
      },
      {
        provider: 'Node Provider 3',
        nodeAmount: 1,
        apy: 33,
        stakedPool: 182,
        stakedPoolPercent: 8,
        rps: new BigNumber(289),
        online: 1,
        bondingDays: 13,
      },
    ],
  };
};
