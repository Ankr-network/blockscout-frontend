import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
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
    amount: ZERO.plus(132),
    amountUsd: ZERO.plus(13_200),
    token: Token.AVAX,
  },
  {
    amount: ZERO.plus(1),
    amountUsd: ZERO.plus(1_000),
    token: Token.ETH,
  },
];

export const useTotalClaimed = (): IUseTotalClaimed => {
  return {
    isLoading: false,
    data: DEMO_DATA,
  };
};
