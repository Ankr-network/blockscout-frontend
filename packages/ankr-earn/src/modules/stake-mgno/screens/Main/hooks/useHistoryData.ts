import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

interface IHistoryData {
  date: Date;
  hash: string;
  link?: string;
  event?: string;
  provider: string;
  amount: BigNumber;
}

interface IHistory {
  isLoading: boolean;
  data: IHistoryData[] | null;
}

const DEMO_DATA: IHistoryData[] = [
  {
    date: new Date(),
    hash: '0xasd0asd0sqa9a9sf80d8sfa0f98dsf67874',
    link: '',
    event: 'Stake',
    provider: 'Node Provider 1',
    amount: ZERO.plus(12),
  },
  {
    date: new Date(),
    hash: '0x213l12h3jh31lkj2h3lk1jh23l',
    link: '',
    event: 'Unstake',
    provider: 'Node Provider 2',
    amount: ZERO.plus(99999),
  },
];

export const useHistoryData = (): IHistory => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
