import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchPrivateStats = createAction<RequestAction<PrivateStats>>(
  'chains/fetchPrivateStats',
  (interval: PrivateStatsInterval, poll?: number, requestKey?: string) => ({
    request: {
      promise: (async () => {})(),
    },
    meta: {
      asMutation: false,
      onRequest: () => ({
        promise: (async (): Promise<PrivateStats> => {
          const service = await MultiService.getInstance();
    
          const result = await service.getPrivateStats(interval);
    
          return result;
        })(),
      }),
      poll,
      requestKey,
      takeLatest: true,
    },
  }),
);
