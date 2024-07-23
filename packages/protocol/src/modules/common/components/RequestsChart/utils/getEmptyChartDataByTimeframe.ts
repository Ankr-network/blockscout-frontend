import { IChartProps, Timeframe } from '@ankr.com/telemetry';

import { mapTimeframeToRequestParams } from 'domains/dashboard/screens/Dashboard/components/AllChainsLayout/v2/utils';

export const getEmptyChartData = (timeframe: Timeframe): IChartProps => {
  return {
    data: [
      {
        time: new Date(mapTimeframeToRequestParams(timeframe).from),
        value: 0,
      },
      {
        time: new Date(mapTimeframeToRequestParams(timeframe).to),
        value: 0,
      },
    ],
    loading: false,
  };
};
