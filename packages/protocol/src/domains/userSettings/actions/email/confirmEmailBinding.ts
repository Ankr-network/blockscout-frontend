import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse } from 'multirpc-sdk';

interface IConfirmEmailBindingParams {
  email: string;
  code: string;
}

export const confirmEmailBinding = createSmartAction<
  RequestAction<IEmailResponse>,
  [IConfirmEmailBindingParams]
>('userSettings/confirmEmailBinding', ({ email, code }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    cache: false,
    takeLatest: true,
    ...getEmailErrorConfig(),

    onRequest: () => ({
      promise: (async (): Promise<IEmailResponse> => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.confirmEmailBinding(email, code);

        return response;
      })(),
    }),
  },
}));
