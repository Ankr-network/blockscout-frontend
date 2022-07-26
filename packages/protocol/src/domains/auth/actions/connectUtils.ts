import { RequestsStore } from '@redux-requests/core';
import { IJwtToken, MultiRpcSdk, Web3Address } from 'multirpc-sdk';

import { fetchEncryptionKey } from './fetchEncryptionKey';
import { throwIfError } from 'common';
import { hasMetamask } from '../utils/hasMetamask';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { tryToLogin } from '../utils/tryToLogin';
import { switchEthereumChain } from 'domains/auth/utils/switchEthereumChain';
import { authorizeProvider } from 'domains/infrastructure/actions/authorizeProvider';
import { MultiService } from 'modules/api/MultiService';
import { t } from 'modules/i18n/utils/intl';

export interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
}

const timeout = () => new Promise(res => setTimeout(res, 300));

export const connectProvider = async () => {
  if (!hasMetamask()) {
    throw new Error(t('error.no-metamask'));
  }

  const service = await MultiService.getInstance();

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
    service.getAccountGateway().addToken(cachedAuthToken);

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
    data: { key: encryptionPublicKey },
  } = throwIfError(await store.dispatchRequest(fetchEncryptionKey()));

  const { currentAccount: address } = service.getKeyProvider();
  const credentials = await tryToLogin(service, address, encryptionPublicKey);

  const { data: authorizationToken } = throwIfError(
    await store.dispatchRequest(authorizeProvider()),
  );

  store.dispatch(
    setAuthData({
      credentials,
      address,
      authorizationToken,
      encryptionPublicKey,
    }),
  );

  return {
    address,
    credentials,
  };
};

export const disconnectService = async () => {
  const service = await MultiService.getInstance();
  service.getWorkerGateway().removeJwtToken();
  service.getAccountGateway().removeToken();

  service.getKeyProvider().disconnect();
  MultiService.removeInstance();
};
