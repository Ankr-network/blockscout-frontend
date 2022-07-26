import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import { IEmailResponse, Web3Address } from 'multirpc-sdk';

interface IAddNewEmailBindingParams {
  address: Web3Address;
  email: string;
}

export const addNewEmailBinding = createAction<
  RequestAction<IEmailResponse>,
  [IAddNewEmailBindingParams]
>('userSettings/addNewEmailBinding', ({ address, email }) => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();

      const accountGateway = service.getAccountGateway();

      const response = await accountGateway.addNewEmailBinding(email);

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
