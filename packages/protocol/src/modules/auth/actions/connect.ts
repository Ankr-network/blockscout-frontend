import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken, Web3Address } from '@ankr.com/multirpc';

import { MultiService } from '../../api/MultiService';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { withStore } from '../utils/withStore';
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { throwIfError } from '../../api/utils/throwIfError';
// eslint-disable-next-line import/no-cycle
import { fetchDepositStatus } from './fetchDepositStatus';
import { hasMetamask } from '../utils/hasMetamask';
import { selectCredentials, setCredentials } from 'modules/user/userSlice';

const PROVIDER_ERROR_USER_DENIED = 4001;

interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
}

const timeout = () => new Promise(res => setTimeout(res, 300));

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  () => ({
    request: {
      promise: async (store: RequestsStore) => {
        const { service } = MultiService.getInstance();

        if (!hasMetamask()) {
          throw new Error('no metamask extension found');
        }

        await service.getKeyProvider().connect(await injectWeb3Modal());

        // TODO: try to avoid this timeout in the future PROTOCOL-244
        await timeout();

        const address = service.getKeyProvider().currentAccount();

        const cachedCredentials = selectCredentials(store.getState());

        if (cachedCredentials) {
          return {
            address,
            credentials: cachedCredentials,
          };
        }

        const {
          data: { key },
        } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));

        const credentials = await (async function tryToLogin() {
          try {
            return await service.loginAsUser(address, key);
          } catch (error: any) {
            if (error.code === PROVIDER_ERROR_USER_DENIED) {
              throw error;
            }

            return undefined;
          }
        })();

        if (credentials) {
          store.dispatch(setCredentials(credentials));
        }

        return {
          address,
          credentials,
        };
      },
    },
    meta: {
      onRequest: withStore,
      asMutation: false,
      getData: data => data,
      onSuccess: (response, action, store) => {
        store.dispatchRequest(fetchDepositStatus());
        return response;
      },
    },
  }),
);
