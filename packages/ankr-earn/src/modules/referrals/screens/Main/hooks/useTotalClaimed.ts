import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

interface IUseTotalClaimedData {
  amount: BigNumber;
  amountUsd: BigNumber;
  token: Token;
}

interface IUseTotalClaimed {
  isLoading: boolean;
  data: IUseTotalClaimedData[] | null;
}

const DEMO_DATA: IUseTotalClaimedData[] = [
  {
    amount: new BigNumber(132),
    amountUsd: new BigNumber(13_200),
    token: Token.AVAX,
  },
  {
    amount: new BigNumber(1),
    amountUsd: new BigNumber(1_000),
    token: Token.ETH,
  },
];

export const useTotalClaimed = (): IUseTotalClaimed => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
