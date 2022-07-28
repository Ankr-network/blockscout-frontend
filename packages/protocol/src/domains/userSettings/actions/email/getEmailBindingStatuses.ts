import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';

import { getEmailErrorConfig } from 'domains/userSettings/utils/getEmailErrorConfig';
import { MultiService } from 'modules/api/MultiService';
import {
  EmailConfirmationStatus,
  IEmailResponse,
  Web3Address,
} from 'multirpc-sdk';

interface IGetEmailBindingStatusesParams {
  address: Web3Address;
  filters?: EmailConfirmationStatus;
}

export const getEmailBindingStatuses = createAction<
  RequestAction<IEmailResponse>,
  [IGetEmailBindingStatusesParams]
>('userSettings/getEmailBindingStatuses', ({ address, filters }) => ({
  request: {
    promise: (async () => {
      const service = await MultiService.getInstance();

      const accountGateway = service.getAccountGateway();

      const response = await accountGateway.getEmailBindingStatuses(filters);

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
