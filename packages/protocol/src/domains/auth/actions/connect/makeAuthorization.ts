import { EWalletId, getWalletName } from '@ankr.com/provider';
import { MultiRpcSdk, MultiRpcWeb3Sdk } from 'multirpc-sdk';

import { ANKR_PAYMENT_NETWORK } from 'modules/payments/const';
import { AppDispatch } from 'store';
import { IAuthSlice, setAuthData } from 'domains/auth/store/authSlice';
import { getProviderManager } from 'modules/api/getProviderManager';
import {
  setNetworkId,
  setWalletAddress,
  setWalletMeta,
} from 'domains/wallet/store/walletSlice';

import { addSignedWorkerTokenToService } from '../utils/addSignedWorkerTokenToService';
import { authCheckDevdaoInstantJwtParticipant } from '../instantJwt/checkDevdaoInstantJwtParticipant';
import { authFetchDevdaoInstantJwtParticipantToken } from '../instantJwt/fetchDevdaoInstantJwtParticipantToken';
import { authFetchInstantJwtParticipantToken } from '../instantJwt/fetchInstantJwtParticipantToken';
import { fetchPremiumStatus } from '../fetchPremiumStatus';

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
  currentAccount,
  dispatch,
  totp,
  web3Service,
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
    await web3Service.isOldPremiumAndActiveToken(
      currentAccount,
      ANKR_PAYMENT_NETWORK,
    );

  if (isOldPremiumAndActiveToken) {
    return web3Service.getOldPremiumJwtToken(
      currentAccount,
      ANKR_PAYMENT_NETWORK,
    );
  }

  dispatch(setAuthData({ isInstantJwtParticipant: true }));

  return dispatch(
    authFetchInstantJwtParticipantToken.initiate({ params: null, totp }),
  ).unwrap();
};

export interface IMakeAuthorizationParams {
  web3Service: MultiRpcWeb3Sdk;
  service: MultiRpcSdk;
  dispatch: AppDispatch;
  walletId: EWalletId;
  hasOauthLogin?: boolean;
  totp?: string;
}

export interface IMakeAuthorizationResult {
  authData: IAuthSlice;
}

export const makeAuthorization = async ({
  dispatch,
  hasOauthLogin,
  service,
  totp,
  walletId,
  web3Service,
}: IMakeAuthorizationParams): Promise<IMakeAuthorizationResult> => {
  const providerManager = getProviderManager();
  const provider = await providerManager.getETHWriteProvider(
    EWalletId.injected,
  );

  const { currentAccount } = provider;

  const jwtTokenFullData = await getJwtTokenFullData({
    web3Service,
    dispatch,
    currentAccount,
    totp,
  });

  const { jwtToken: credentials, workerTokenData } = jwtTokenFullData;

  if (workerTokenData?.userEndpointToken) {
    await dispatch(
      fetchPremiumStatus.initiate(workerTokenData.userEndpointToken, {
        forceRefetch: true,
      }),
    );
  }

  addSignedWorkerTokenToService({
    service,
    signedWorkerToken: workerTokenData?.signedToken,
  });

  const walletMeta = provider.getWalletMeta();
  const currentNetworkId = provider.currentChain;

  const authData: IAuthSlice = {
    authAddress: currentAccount,
    credentials,
    hasOauthLogin,
    hasWeb3Connection: true,
    isCardPayment: false,
    trackingWalletName: getWalletName(walletId),
    walletMeta,
    workerTokenData,
  };

  dispatch(setAuthData(authData));

  dispatch(setWalletAddress(currentAccount));
  dispatch(setNetworkId(currentNetworkId));
  dispatch(setWalletMeta(walletMeta));

  return { authData };
};
