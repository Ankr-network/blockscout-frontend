import BigNumber from 'bignumber.js';

export interface Stats {
  total: BigNumber;
  failovers: BigNumber;
  successPercent: BigNumber;
}

export enum Timeframe {
  DAY,
  MONTH,
  WEEK,
}
