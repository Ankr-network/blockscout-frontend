import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse, Web3Address } from 'multirpc-sdk';

interface IConfirmEmailBindingParams {
  address: Web3Address;
  email: string;
  code: string;
}

export const confirmEmailBinding = createAction<
  RequestAction<IEmailResponse>,
  [IConfirmEmailBindingParams]
>('userSettings/confirmEmailBinding', ({ address, email, code }) => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    requestKey: address,
    asMutation: false,
    cache: false,
    takeLatest: true,
    onRequest: () => ({
      promise: (async () => {
        const service = await MultiService.getInstance();

        const accountGateway = service.getAccountGateway();

        const response = await accountGateway.confirmEmailBinding(email, code);

        return response;
      })(),
    }),
    ...getEmailErrorConfig(),
  },
}));
