import { RequestsStore } from '@redux-requests/core';
import { IJwtToken, MultiRpcSdk, Web3Address } from 'multirpc-sdk';

import { throwIfError } from 'common';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { switchEthereumChain } from 'domains/auth/utils/switchEthereumChain';
import { authorizeProvider } from 'domains/infrastructure/actions/authorizeProvider';
import { MultiService } from 'modules/api/MultiService';

import { timeout } from 'modules/common/utils/timeout';
import { IWalletMeta } from '@ankr.com/provider-core';

export interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
  walletMeta?: IWalletMeta;
}

export const switchChain = async () => {
  await switchEthereumChain();

  // TODO: try to avoid this timeout in the future PROTOCOL-244
  await timeout(300);
};

export const getCachedData = async (
  service: MultiRpcSdk,
  store: RequestsStore,
) => {
  const {
    credentials: cachedCredentials,
    address: cachedAddress,
    authorizationToken: cachedAuthToken,
    walletMeta,
  } = selectAuthData(store.getState());

  if (cachedAddress && cachedAuthToken) {
    service.getAccountGateway().addToken(cachedAuthToken);

    return {
      address: cachedAddress,
      credentials: cachedCredentials,
      walletMeta,
    };
  }

  return null;
};

export const loginAndCache = async (
  service: MultiRpcSdk,
  store: RequestsStore,
) => {
  const { currentAccount: address } = service.getKeyProvider();

  const credentials = await service.loginAsUser(address);

  const { data: authorizationToken } = throwIfError(
    await store.dispatchRequest(authorizeProvider()),
  );

  const keyProvider = service.getKeyProvider();
  const walletMeta = keyProvider.getWalletMeta();

  store.dispatch(
    setAuthData({
      credentials,
      address,
      authorizationToken,
      walletMeta,
    }),
  );

  return {
    address,
    credentials,
    walletMeta,
  };
};

export const disconnectService = () => {
  MultiService.removeInstance();
};
