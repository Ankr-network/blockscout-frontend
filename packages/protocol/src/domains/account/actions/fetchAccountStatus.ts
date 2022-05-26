import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { AccountStatus } from 'multirpc-sdk';
import { MultiService } from 'modules/api/MultiService';

export const fetchAccountStatus = createAction<RequestAction<AccountStatus>>(
  'account/fetchAccountStatus',
  (account: string) => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      asMutation: false,
      takeLatest: true,
      poll: 30,
      onRequest: () => ({
        promise: (async (): Promise<AccountStatus> => {
          const { service } = MultiService.getInstance();

          const status = await service.getAccountStatus(account);

          return status;
        })(),
      }),
    },
  }),
);
