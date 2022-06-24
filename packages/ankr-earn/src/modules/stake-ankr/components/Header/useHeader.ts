import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

interface IUseHeader {
  balance?: BigNumber;
  getTokensLink: string;
}

export const useHeader = (): IUseHeader => {
  // todo: use actual value
  const balance = ZERO;

  // todo: use actual value
  const getTokensLink = 'https://google.com';

  return { balance, getTokensLink };
};
