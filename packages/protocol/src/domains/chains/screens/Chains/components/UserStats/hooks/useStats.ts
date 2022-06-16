import BigNumber from 'bignumber.js';

import { Stats, Timeframe } from '../types';

const { DAY, WEEK, MONTH } = Timeframe;

const getRandomInt = (max = 25_000_000) =>
  new BigNumber(Math.floor(Math.random() * max));

const getMockStats = (): Stats => {
  const total = getRandomInt();
  const failovers = getRandomInt(25_000);
  const successPercent = total.minus(failovers).div(total);

  return { failovers, successPercent, total };
};

const mock: Record<Timeframe, Stats> = {
  [DAY]: getMockStats(),
  [WEEK]: getMockStats(),
  [MONTH]: getMockStats(),
};

export const useStats = (timeframe: Timeframe) => {
  const stats = mock[timeframe];

  return { isLoading: false, stats };
};
