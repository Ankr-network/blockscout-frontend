import { RequestsStore } from '@redux-requests/core';
import {
  IJwtToken,
  MultiRpcWeb3Sdk,
  MultiRpcSdk,
  Web3Address,
  EthAddressType,
  WorkerTokenData,
} from 'multirpc-sdk';

import { throwIfError } from '@ankr.com/common';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { switchEthereumChain } from 'domains/auth/utils/switchEthereumChain';
import { getAuthorizationToken } from 'domains/infrastructure/actions/getAuthorizationToken';
import { MultiService } from 'modules/api/MultiService';
import { timeout } from 'modules/common/utils/timeout';
import { IWalletMeta } from '@ankr.com/provider';
import { getActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';

export interface IConnect {
  address: Web3Address;
  credentials?: IJwtToken;
  walletMeta?: IWalletMeta;
  workerTokenData?: WorkerTokenData;
  hasWeb3Connection: boolean;
}

export const switchChain = async () => {
  await switchEthereumChain();

  // TODO: try to avoid this timeout in the future PROTOCOL-244
  await timeout(300);
};

export const getCachedData = (service: MultiRpcSdk, store: RequestsStore) => {
  const {
    credentials,
    workerTokenData,
    address,
    authorizationToken,
    walletMeta,
    hasWeb3Connection,
    hasOauthLogin,
  } = selectAuthData(store.getState());

  if (authorizationToken) {
    service.getAccountGateway().addToken(authorizationToken);

    if (workerTokenData) {
      service.getWorkerGateway().addJwtToken(workerTokenData.signedToken);
    }
  }

  return {
    address,
    credentials,
    workerTokenData,
    walletMeta,
    hasWeb3Connection,
    hasOauthLogin,
  };
};

export const loginAndCache = async (
  web3Service: MultiRpcWeb3Sdk,
  service: MultiRpcSdk,
  store: RequestsStore,
  hasOauthLogin?: boolean,
) => {
  if (!hasOauthLogin) {
    const { data: authorizationToken } = throwIfError(
      await store.dispatchRequest(getAuthorizationToken()),
    );

    service.getAccountGateway().addToken(authorizationToken);

    const { data } = await store.dispatchRequest(getActiveEmailBinding());

    store.dispatch(
      setAuthData({
        authorizationToken,
        address: data?.address,
        email: data?.email,
        ethAddressType: EthAddressType.User,
      }),
    );
  }

  const { currentAccount: address } = web3Service.getKeyProvider();

  const { jwtToken: credentials, workerTokenData } =
    await web3Service.getIssuedJwtToken(address);

  if (workerTokenData) {
    service.getWorkerGateway().addJwtToken(workerTokenData.signedToken);
  }

  const keyProvider = web3Service.getKeyProvider();
  const walletMeta = keyProvider.getWalletMeta();

  const authData = {
    address,
    credentials: credentials || undefined,
    walletMeta,
    workerTokenData,
    hasWeb3Connection: true,
  };

  store.dispatch(setAuthData(authData));

  return authData;
};

export const disconnectService = () => {
  MultiService.removeServices();
};
