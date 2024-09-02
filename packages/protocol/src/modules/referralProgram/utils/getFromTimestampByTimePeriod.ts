import { EMilliSeconds } from 'modules/common/constants/const';

import { ERewardTxsPeriod } from '../types';

const timePeriodsMap: Record<ERewardTxsPeriod, number> = {
  [ERewardTxsPeriod.LastWeek]: EMilliSeconds.Week,
  [ERewardTxsPeriod.LastMonth]: EMilliSeconds.Month,
  [ERewardTxsPeriod.LastYear]: EMilliSeconds.Year,
  [ERewardTxsPeriod.AllTime]: 0,
};

export const getFromTimestampByTimePeriod = (timePeriod: ERewardTxsPeriod) => {
  if (timePeriod === ERewardTxsPeriod.AllTime) {
    return undefined;
  }

  return Date.now() - timePeriodsMap[timePeriod];
};
