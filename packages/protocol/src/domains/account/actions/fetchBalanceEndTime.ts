import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { MultiService } from 'modules/api/MultiService';

export const fetchBalanceEndTime = createAction<RequestAction<number>>(
  'account/fetchBalanceEndTime',
  (blockchains?: string[]) => ({
    request: {
      promise: (async (): Promise<number> => {
        const service = MultiService.getService();

        const endTime = await service
          .getAccountGateway()
          .getBalanceEndTime(blockchains);

        return endTime;
      })(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
    },
  }),
);
