import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse, Web3Address } from 'multirpc-sdk';

interface IGetActiveEmailBindingParams {
  address: Web3Address;
}

export const getActiveEmailBinding = createAction<
  RequestAction<IEmailResponse>,
  [IGetActiveEmailBindingParams]
>('userSettings/getActiveEmailBinding', ({ address }) => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();

      const accountGateway = service.getAccountGateway();

      const response = await accountGateway.getActiveEmailBinding();

      return response;
    })(),
  },
  meta: {
    requestKey: address,
    cache: false,
    asMutation: false,
    takeLatest: true,
    ...getEmailErrorConfig(),
  },
}));
