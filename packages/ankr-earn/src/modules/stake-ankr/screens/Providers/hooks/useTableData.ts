import BigNumber from 'bignumber.js';

import { EProviderStatus } from 'modules/stake-ankr/const';

interface ITableRow {
  provider: string;
  nodeAmount: number;
  apy: number;
  stakedPool: number;
  stakedPoolPercent: number;
  rps: BigNumber;
  online: number;
  status: EProviderStatus;
  stakeLink?: string;
  detailsLink?: string;
  exitDays?: number;
  bondingDays?: number;
}
interface ITableData {
  isLoading: boolean;
  data: ITableRow[];
}

export const useTableData = (): ITableData => {
  return {
    isLoading: false,
    data: getDemoData(),
  };
};

function getDemoData() {
  const data: ITableRow[] = [];

  data.push({
    provider: 'Node Provider 1',
    nodeAmount: 6,
    apy: 12,
    stakedPool: 4544,
    stakedPoolPercent: 23,
    rps: new BigNumber(11920),
    online: 37,
    status: EProviderStatus.active,
    exitDays: 1,
  });

  data.push({
    provider: 'Node Provider 2',
    nodeAmount: 2,
    apy: 13,
    stakedPool: 3244,
    stakedPoolPercent: 14,
    rps: new BigNumber(10202),
    online: 31,
    status: EProviderStatus.notFound,
    stakeLink: 'stakeLink',
    detailsLink: 'detailsLink',
  });

  data.push({
    provider: 'Node Provider 3',
    nodeAmount: 1,
    apy: 33,
    stakedPool: 182,
    stakedPoolPercent: 8,
    rps: new BigNumber(289),
    online: 1,
    bondingDays: 13,
    status: EProviderStatus.pending,
  });

  return data;
}
