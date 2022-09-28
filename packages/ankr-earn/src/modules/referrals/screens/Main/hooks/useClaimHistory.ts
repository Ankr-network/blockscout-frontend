import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

interface IUseClaimHistoryData {
  date: Date;
  amount: BigNumber;
  amountUsd: BigNumber;
  token: Token;
}

interface IUseClaimHistory {
  isLoading: boolean;
  data: IUseClaimHistoryData[] | null;
}

const DEMO_DATA: IUseClaimHistoryData[] = [
  {
    date: new Date(),
    amount: new BigNumber(300),
    amountUsd: new BigNumber(30_000),
    token: Token.BNB,
  },
  {
    date: new Date(),
    amount: new BigNumber(100),
    amountUsd: new BigNumber(10_000),
    token: Token.MATIC,
  },
];

export const useClaimHistory = (): IUseClaimHistory => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
