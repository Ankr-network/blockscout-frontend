import { RequestAction } from '@redux-requests/core';
import { createAction } from 'redux-smart-actions';
import BigNumber from 'bignumber.js';

import { MultiService } from 'modules/api/MultiService';

export const fetchAccountBalance = createAction<
  RequestAction<BigNumber, BigNumber>
>('account/fetchAccountBalance', () => ({
  request: {
    promise: (async () => null)(),
  },
  meta: {
    asMutation: false,
    takeLatest: true,
    hideNotificationOnError: true,
    onRequest: () => ({
      promise: (async (): Promise<BigNumber> => {
        const service = await MultiService.getInstance();

        const data = await service
          .getPAYGContractManager()
          .getCurrentAccountBalance();

        const keyProvider = service.getKeyProvider();

        const value = keyProvider.getWeb3().utils.fromWei(data);

        return new BigNumber(value);
      })(),
    }),
  },
}));
