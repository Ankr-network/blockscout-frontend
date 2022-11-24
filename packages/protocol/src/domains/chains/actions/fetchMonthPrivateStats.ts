import {
  IApiPrivateStats,
  PrivateStats,
  PrivateStatsInterval,
} from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

const getPrivateStats = (data: IApiPrivateStats): PrivateStats => {
  return {
    ...data,
    totalRequests: data?.total_requests ?? 0,
  };
};

export const fetchMonthPrivateStats = createAction<
  RequestAction<IApiPrivateStats, PrivateStats>
>('chains/fetchMonthPrivateStats', () => ({
  request: {
    promise: (async () => {})(),
  },
  meta: {
    asMutation: false,
    getData: getPrivateStats,
    onRequest: () => ({
      promise: (async (): Promise<IApiPrivateStats> => {
        const service = MultiService.getService();

        const result = await service
          .getAccountGateway()
          .getPrivateStats(PrivateStatsInterval.MONTH);

        return result;
      })(),
    }),
    takeLatest: true,
  },
}));
