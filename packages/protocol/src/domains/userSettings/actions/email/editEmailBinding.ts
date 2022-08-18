import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IEditEmailBindingParams {
  email: string;
}

export const editEmailBinding = createSmartAction<
  RequestAction<IEmailResponse>,
  [IEditEmailBindingParams]
>('userSettings/editEmailBinding', ({ email }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    cache: false,
    asMutation: false,
    takeLatest: true,
    ...getEmailErrorConfig(),

    onRequest: () => ({
      promise: (async (): Promise<IEmailResponse> => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.editEmailBinding(email);

        return response;
      })(),
    }),
  },
}));
