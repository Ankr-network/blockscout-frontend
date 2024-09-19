import { EPrivateStatsInterval } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { EMilliSeconds } from 'modules/common/constants/const';

export const mapTimeframeToRequestParams = (timeframe: Timeframe) => {
  const nowInMs = new Date().getTime();

  switch (timeframe) {
    case Timeframe.Hour:
      return {
        to: nowInMs,
        from: nowInMs - EMilliSeconds.Hour,
        intervalDuration: EPrivateStatsInterval.FIVE_MINUTES,
      };
    case Timeframe.Day:
      return {
        to: nowInMs,
        from: nowInMs - EMilliSeconds.Day,
        intervalDuration: EPrivateStatsInterval.HOUR,
      };
    case Timeframe.Week:
      return {
        to: nowInMs,
        from: nowInMs - EMilliSeconds.Week,
        intervalDuration: EPrivateStatsInterval.DAY,
      };
    default:
    case Timeframe.Month:
      return {
        to: nowInMs,
        from: nowInMs - EMilliSeconds.Month,
        intervalDuration: EPrivateStatsInterval.DAY,
      };
  }
};
