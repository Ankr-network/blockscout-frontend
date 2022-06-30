import { PrivateStats, PrivateStatsInterval } from 'multirpc-sdk';
import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchPrivateStats = createAction<RequestAction<PrivateStats>>(
  'chains/fetchPrivateStats',
  (interval: PrivateStatsInterval) => ({
    request: {
      promise: MultiService.getInstance().service.getPrivateStats(interval),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
    },
  }),
);
