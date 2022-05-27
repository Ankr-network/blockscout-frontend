import BigNumber from 'bignumber.js';

export interface Balance {
  ankrBalance: BigNumber;
  creditBalance: BigNumber;
  usdBalance: BigNumber;
}
