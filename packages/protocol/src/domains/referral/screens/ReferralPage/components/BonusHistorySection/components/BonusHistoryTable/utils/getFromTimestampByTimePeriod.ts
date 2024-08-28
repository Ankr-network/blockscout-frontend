import { ETimePeriod } from 'domains/referral/screens/ReferralPage/types';
import { EMilliSeconds } from 'modules/common/constants/const';

const timePeriodsMap: Record<ETimePeriod, number> = {
  [ETimePeriod.LastWeek]: EMilliSeconds.Week,
  [ETimePeriod.LastMonth]: EMilliSeconds.Month,
  [ETimePeriod.LastYear]: EMilliSeconds.Year,
  [ETimePeriod.AllTime]: 0,
};

export const getFromTimestampByTimePeriod = (timePeriod: ETimePeriod) => {
  if (timePeriod === ETimePeriod.AllTime) {
    return undefined;
  }

  return Date.now() - timePeriodsMap[timePeriod];
};
