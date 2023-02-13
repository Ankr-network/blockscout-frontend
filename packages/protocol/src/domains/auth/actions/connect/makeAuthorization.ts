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
import { authCheckInstantJwtParticipant } from '../instantJwt/checkInstantJwtParticipant';
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
    authCheckInstantJwtParticipant.initiate(),
  ).unwrap();

  dispatch(setAuthData({ isInstantJwtParticipant: isParticipant }));

  return isParticipant;
};

const getWeb3UserJwtTokenFullData = (
  web3Service: MultiRpcWeb3Sdk,
  dispatch: AppDispatch,
  currentAccount: string,
  isParticipant: boolean,
) => {
  return isParticipant
    ? dispatch(authFetchInstantJwtParticipantToken.initiate()).unwrap()
    : web3Service.getIssuedJwtTokenOrIssue(currentAccount);
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

const getJwtTokenFullData = async (
  web3Service: MultiRpcWeb3Sdk,
  dispatch: AppDispatch,
  currentAccount: string,
) => {
  const isParticipant = await isInstantJwtParticipant(dispatch);

  return getWeb3UserJwtTokenFullData(
    web3Service,
    dispatch,
    currentAccount,
    isParticipant,
  );
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

    jwtTokenFullData = await getJwtTokenFullData(
      web3Service,
      dispatch,
      currentAccount,
    );
  }

  const { jwtToken: credentials, workerTokenData } = jwtTokenFullData;

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
