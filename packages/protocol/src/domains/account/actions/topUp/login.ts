import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

import { resetTransaction } from 'domains/account/store/accountTopUpSlice';
import { connect } from 'domains/auth/actions/connect';
import { setAuthData } from 'domains/auth/store/authSlice';
import { MultiService } from 'modules/api/MultiService';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { IJwtToken } from 'multirpc-sdk';
import { fetchPublicKey } from '../fetchPublicKey';

interface IDeposit {
  address: string;
  credentials: IJwtToken;
}

export const login = createSmartAction<RequestAction<string, string>>(
  'topUp/login',
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
            const service = await MultiService.getInstance();
            const provider = service.getKeyProvider();
            const { currentAccount: address } = provider;

            const { data: publicKey } = await store.dispatchRequest(
              fetchPublicKey(),
            );

            const credentials = await service.loginAsUser(
              address,
              publicKey as string,
            );

            if (credentials) {
              store.dispatch(setAuthData({ credentials }));
            }

            store.dispatch(resetTransaction({ address }));

            return {
              address,
              credentials,
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
