import {
  EthAddressType,
  JwtTokenFullData,
  MultiRpcSdk,
  MultiRpcWeb3Sdk,
} from 'multirpc-sdk';
import { EWalletId, getWalletName } from '@ankr.com/provider';

import { AppDispatch, GetState } from 'store';
import { authAuthorizeProvider } from '../getAuthorizationToken';
import {
  IAuthSlice,
  selectAuthData,
  setAuthData,
} from 'domains/auth/store/authSlice';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';
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
    service.getAccountGateway().addToken(authData?.authorizationToken);

    if (authData?.workerTokenData) {
      service
        .getWorkerGateway()
        .addJwtToken(authData?.workerTokenData.signedToken);
    }
  }

  return authData;
};

const setWeb3UserAuthorizationToken = async (
  service: MultiRpcSdk,
  dispatch: AppDispatch,
) => {
  const authorizationToken = await dispatch(
    authAuthorizeProvider.initiate(),
  ).unwrap();

  dispatch(
    setAuthData({ authorizationToken, ethAddressType: EthAddressType.User }),
  );

  service.getAccountGateway().addToken(authorizationToken);
};

const isInstantJwtParticipant = async (dispatch: AppDispatch) => {
  const isParticipant = await dispatch(
    authCheckDevdaoInstantJwtParticipant.initiate(),
  ).unwrap();

  return isParticipant;
};

const fetchUserEmail = (dispatch: AppDispatch) => {
  dispatch(
    userSettingsGetActiveEmailBinding.initiate({
      params: undefined,
      shouldNotify: false,
    }),
  );
};

const getJwtTokenFullDataWithOauthLogin = (
  web3Service: MultiRpcWeb3Sdk,
  currentAccount: string,
) => {
  return web3Service.getIssuedJwtTokenOrIssue(currentAccount);
};

const getJwtTokenFullData = async (dispatch: AppDispatch) => {
  const isParticipant = await isInstantJwtParticipant(dispatch);

  dispatch(setAuthData({ isInstantJwtParticipant: true }));

  return isParticipant
    ? dispatch(authFetchDevdaoInstantJwtParticipantToken.initiate()).unwrap()
    : dispatch(authFetchInstantJwtParticipantToken.initiate()).unwrap();
};

export const makeAuthorization = async (
  web3Service: MultiRpcWeb3Sdk,
  service: MultiRpcSdk,
  dispatch: AppDispatch,
  walletId: EWalletId,
  hasOauthLogin?: boolean,
): Promise<IAuthSlice> => {
  const { currentAccount } = web3Service.getKeyProvider();

  let jwtTokenFullData: JwtTokenFullData = {};

  if (hasOauthLogin) {
    jwtTokenFullData = await getJwtTokenFullDataWithOauthLogin(
      web3Service,
      currentAccount,
    );
  } else {
    await setWeb3UserAuthorizationToken(service, dispatch);
    fetchUserEmail(dispatch);

    jwtTokenFullData = await getJwtTokenFullData(dispatch);
  }

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

  dispatch(setAuthData(authData));

  return authData;
};
