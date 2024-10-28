import { StatsByRangeDuration } from 'multirpc-sdk';

import { EMilliSeconds } from 'modules/common/constants/const';

const millisecondsMap: Record<StatsByRangeDuration, number> = {
  [StatsByRangeDuration.DAY]: EMilliSeconds.Hour * 12,
  [StatsByRangeDuration.HOUR]: EMilliSeconds.Minute * 30,
  [StatsByRangeDuration.MONTH]: EMilliSeconds.Day * 15,
  [StatsByRangeDuration.SIX_MONTH]: EMilliSeconds.Month * 3,
  [StatsByRangeDuration.TWO_DAYS]: EMilliSeconds.Day,
  [StatsByRangeDuration.TWO_HOURS]: EMilliSeconds.Hour,
};

export const getHalfDuration = (duration: StatsByRangeDuration | undefined) =>
  duration ? millisecondsMap[duration] : 0;
