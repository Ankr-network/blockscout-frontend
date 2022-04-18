import { RequestsStore } from '@redux-requests/core';
import { IJwtToken, MultiRpcSdk, Web3Address } from 'multirpc-sdk';

import { injectWeb3Modal } from '../../api/Web3ModalKeyProvider';
import { fetchEncryptionKey } from './fetchEncryptionKey';
import { throwIfError } from 'common';
import { hasMetamask } from '../utils/hasMetamask';
import { selectAuthData, setAuthData } from 'modules/auth/store/authSlice';
import { tryToLogin } from '../utils/tryToLogin';
import { switchEthereumChain } from '../utils/switchEthereumChain';
import { authorizeProvider } from './authorizeProvider';

export interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
}

const timeout = () => new Promise(res => setTimeout(res, 300));

export const connectProvider = async (service: MultiRpcSdk) => {
  if (!hasMetamask()) {
    throw new Error('no metamask extension found');
  }

  await service.getKeyProvider().connect(await injectWeb3Modal());
  await switchEthereumChain(service);

  // TODO: try to avoid this timeout in the future PROTOCOL-244
  await timeout();
};

export const getCachedData = async (
  service: MultiRpcSdk,
  store: RequestsStore,
) => {
  const {
    credentials: cachedCredentials,
    address: cachedAddress,
    authorizationToken: cachedAuthToken,
  } = selectAuthData(store.getState());

  if (cachedAddress && cachedAuthToken) {
    await service.getAccountGateway().addToken(cachedAuthToken);

    return {
      address: cachedAddress,
      credentials: cachedCredentials,
    };
  }

  return null;
};

export const loginAndCacheAuthData = async (
  service: MultiRpcSdk,
  store: RequestsStore,
) => {
  const {
    data: { key },
  } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));

  const address = service.getKeyProvider().currentAccount();
  const credentials = await tryToLogin(service, address, key);

  const { data: authorizationToken } = throwIfError(
    await store.dispatchRequest(authorizeProvider()),
  );

  if (credentials) {
    store.dispatch(setAuthData({ credentials, address, authorizationToken }));
  }

  return {
    address,
    credentials,
  };
};
