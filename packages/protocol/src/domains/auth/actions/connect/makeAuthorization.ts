import { EthAddressType, MultiRpcSdk, MultiRpcWeb3Sdk } from 'multirpc-sdk';
import { EWalletId, getWalletName } from '@ankr.com/provider';

import { AppDispatch, GetState } from 'store';
import {
  IAuthSlice,
  selectAuthData,
  setAuthData,
} from 'domains/auth/store/authSlice';

import { authAuthorizeProvider } from '../getAuthorizationToken';
import { authCheckDevdaoInstantJwtParticipant } from '../instantJwt/checkDevdaoInstantJwtParticipant';
import { authFetchDevdaoInstantJwtParticipantToken } from '../instantJwt/fetchDevdaoInstantJwtParticipantToken';
import { fetchPremiumStatus } from '../fetchPremiumStatus';
import { authFetchInstantJwtParticipantToken } from '../instantJwt/fetchInstantJwtParticipantToken';

export const getCachedData = (
  service: MultiRpcSdk,
  getState: GetState,
): IAuthSlice => {
  const authData = selectAuthData(getState());

  if (authData?.authorizationToken) {
    service.getAccountingGateway().addToken(authData?.authorizationToken);

    if (authData?.workerTokenData) {
      service
        .getWorkerGateway()
        .addJwtToken(authData?.workerTokenData.signedToken);
    }
  }

  return authData;
};

export const setWeb3UserAuthorizationToken = async (
  service: MultiRpcSdk,
  dispatch: AppDispatch,
) => {
  const authorizationToken = await dispatch(
    authAuthorizeProvider.initiate(),
  ).unwrap();

  dispatch(
    setAuthData({ authorizationToken, ethAddressType: EthAddressType.User }),
  );

  service.getAccountingGateway().addToken(authorizationToken);
};

const isInstantJwtParticipant = async (dispatch: AppDispatch) => {
  const isParticipant = await dispatch(
    authCheckDevdaoInstantJwtParticipant.initiate(),
  ).unwrap();

  return isParticipant;
};

interface GetJwtTokenFullDataArguments {
  web3Service: MultiRpcWeb3Sdk;
  dispatch: AppDispatch;
  currentAccount: string;
  totp?: string;
}

const getJwtTokenFullData = async ({
  web3Service,
  dispatch,
  currentAccount,
  totp,
}: GetJwtTokenFullDataArguments) => {
  const isParticipant = await isInstantJwtParticipant(dispatch);

  if (isParticipant) {
    dispatch(setAuthData({ isInstantJwtParticipant: true }));

    return dispatch(
      authFetchDevdaoInstantJwtParticipantToken.initiate({
        params: null,
        totp,
      }),
    ).unwrap();
  }

  const isOldPremiumAndActiveToken =
    await web3Service.isOldPremiumAndActiveToken(currentAccount);

  if (isOldPremiumAndActiveToken) {
    return web3Service.getOldPremiumJwtToken(currentAccount);
  }

  dispatch(setAuthData({ isInstantJwtParticipant: true }));

  return dispatch(
    authFetchInstantJwtParticipantToken.initiate({ params: null, totp }),
  ).unwrap();
};

interface MakeAuthorizationArguments {
  web3Service: MultiRpcWeb3Sdk;
  service: MultiRpcSdk;
  dispatch: AppDispatch;
  walletId: EWalletId;
  hasOauthLogin?: boolean;
  totp?: string;
}

export const makeAuthorization = async ({
  web3Service,
  service,
  dispatch,
  walletId,
  hasOauthLogin,
  totp,
}: MakeAuthorizationArguments): Promise<IAuthSlice> => {
  const { currentAccount } = web3Service.getKeyProvider();

  const jwtTokenFullData = await getJwtTokenFullData({
    web3Service,
    dispatch,
    currentAccount,
    totp,
  });

  const { jwtToken: credentials, workerTokenData } = jwtTokenFullData;

  if (workerTokenData?.userEndpointToken) {
    await dispatch(
      fetchPremiumStatus.initiate(workerTokenData.userEndpointToken),
    );
  }

  if (workerTokenData) {
    service.getWorkerGateway().addJwtToken(workerTokenData.signedToken);
  }

  const keyProvider = web3Service.getKeyProvider();
  const walletMeta = keyProvider.getWalletMeta();

  const authData: IAuthSlice = {
    address: currentAccount,
    credentials,
    hasOauthLogin,
    hasWeb3Connection: true,
    isCardPayment: false,
    trackingWalletName: getWalletName(walletId),
    walletMeta,
    workerTokenData,
  };

  await dispatch(setAuthData(authData));

  return authData;
};
