import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';
import { MultiService } from '../../api/MultiService';
import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { IJwtToken, Web3Address } from '@ankr.com/multirpc';
import { hasMetamask } from '../utils/hasMetamask';

const PROVIDER_ERROR_USER_DENIED = 4001;

interface IConnect {
  address: Web3Address;
  justDeposited: boolean;
  credentials?: IJwtToken;
}

export const connect = createSmartAction<RequestAction<IConnect, IConnect>>(
  'auth/connect',
  () => ({
    request: {
      promise: (async () => {
        if (!hasMetamask()) {
          throw new Error('no metamask extension found');
        }
        const { service } = MultiService.getInstance();
        await service.getKeyProvider().connect(await injectWeb3Modal());
        const address = service.getKeyProvider().currentAccount();

        const credentials = await (async function tryToLogin() {
          try {
            return await service.loginAsUser(address);
          } catch (error) {
            if (error.code === PROVIDER_ERROR_USER_DENIED) {
              throw error;
            }

            return undefined;
          }
        })();

        return {
          address,
          justDeposited: false,
          credentials,
        } as IConnect;
      })(),
    },
    meta: {
      asMutation: false,
      getData: data => data,
    },
  }),
);
