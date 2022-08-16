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

export const fetchPrivateStats = createAction<
  RequestAction<IApiPrivateStats, PrivateStats>
>(
  'chains/fetchPrivateStats',
  (interval: PrivateStatsInterval, requestKey?: string) => ({
    request: {
      promise: (async () => {})(),
    },
    meta: {
      asMutation: false,
      getData: getPrivateStats,
      onRequest: () => ({
        promise: (async (): Promise<IApiPrivateStats> => {
          const service = await MultiService.getInstance();

          const result = await service.getPrivateStats(interval);

          return result;
        })(),
      }),
      requestKey,
      takeLatest: true,
    },
  }),
);
