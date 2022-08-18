import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse, IGetActiveEmailBindingResponse } from 'multirpc-sdk';

export const getActiveEmailBinding = createSmartAction<
  RequestAction<IEmailResponse>,
  []
>('userSettings/getActiveEmailBinding', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    ...getEmailErrorConfig(),

    onRequest: () => ({
      promise: (async (): Promise<IGetActiveEmailBindingResponse> => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.getActiveEmailBinding();

        return response;
      })(),
    }),
  },
}));
