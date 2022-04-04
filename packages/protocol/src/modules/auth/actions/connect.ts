import { RequestAction, RequestsStore } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { IJwtToken, Web3Address } from 'multirpc-sdk';

import { API_ENV, getExpectedChainId } from 'modules/common/utils/environment';
import { MultiService } from '../../api/MultiService';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { withStore } from '../utils/withStore';
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { throwIfError } from 'common';
import { hasMetamask } from '../utils/hasMetamask';
import { selectCredentials, setCredentials } from 'modules/user/userSlice';
import { tryToLogin } from '../utils/tryToLogin';

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

        const { givenProvider } = service.getKeyProvider().getWeb3();

        await givenProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: `0x${getExpectedChainId(API_ENV)}`,
            },
          ],
        });

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

        const credentials = await tryToLogin(service, address, key);

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
    },
  }),
);
