import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { IJwtToken, Web3Address } from '@ankr.com/multirpc';
import { withStore } from '../utils/withStore';
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { throwIfError } from '../../api/utils/throwIfError';
// eslint-disable-next-line import/no-cycle
import { fetchDepositStatus } from './fetchDepositStatus';
import { hasMetamask } from '../utils/hasMetamask';
import { setHasUserLoggedIn } from '../../common/utils/localStorage';

const PROVIDER_ERROR_USER_DENIED = 4001;

interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
}

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
        const address = service.getKeyProvider().currentAccount();

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

        /* saving user login to localstorage */
        setHasUserLoggedIn();

        return {
          address,
          credentials,
        } as IConnect;
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
