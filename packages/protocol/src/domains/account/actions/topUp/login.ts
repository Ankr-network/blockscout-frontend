import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { connect } from 'domains/auth/actions/connect';
import { setAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { IJwtToken } from 'multirpc-sdk';

interface IDeposit {
  address: string;
  credentials: IJwtToken;
}

export const login = createSmartAction<RequestAction<string, string>>(
  'topUp/issueJwtToken',
  () => ({
    request: {
      promise: (async () => null)(),
    },
    meta: {
      onRequest: (
        request: any,
        action: RequestAction,
        store: RequestsStore,
      ) => {
        return {
          promise: (async (): Promise<any> => {
            const service = await MultiService.getWeb3Service();
            const provider = service.getKeyProvider();
            const { currentAccount: address } = provider;

            const { jwtToken: credentials, workerTokenData } =
              await service.issueJwtToken(address);

            if (credentials) {
              store.dispatch(setAuthData({ credentials, workerTokenData }));
            }

            store.dispatch(resetTransaction({ address }));

            return {
              address,
              credentials,
              workerTokenData,
            };
          })(),
        };
      },
      asMutation: true,
      mutations: {
        [connect.toString()]: (
          data: ResponseData<typeof connect>,
          mutationData: IDeposit,
        ): ResponseData<typeof connect> => {
          return {
            ...data,
            ...mutationData,
          };
        },
      },
    },
  }),
);
