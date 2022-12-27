import {
  EthAddressType,
  IJwtToken,
  MultiRpcSdk,
  MultiRpcWeb3Sdk,
  Web3Address,
  WorkerTokenData,
} from 'multirpc-sdk';
import { IWalletMeta } from '@ankr.com/provider';

import { AppDispatch, GetState } from 'store';
import { MultiService } from 'modules/api/MultiService';
import { infrastructureAuthorizeProvider } from 'domains/infrastructure/actions/getAuthorizationToken';
import { selectAuthData, setAuthData } from 'domains/auth/store/authSlice';
import { switchEthereumChain } from 'domains/auth/utils/switchEthereumChain';
import { timeout } from 'modules/common/utils/timeout';
import { userSettingsGetActiveEmailBinding } from 'domains/userSettings/actions/email/getActiveEmailBinding';

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

interface CachedData extends IConnect {
  hasOauthLogin?: boolean;
  isCardPayment?: boolean;
  hasOauthUserDepositTransaction?: boolean;
}

export const getCachedData = (
  service: MultiRpcSdk,
  getState: GetState,
): CachedData => {
  const {
    credentials,
    workerTokenData,
    address = '',
    authorizationToken,
    walletMeta,
    hasWeb3Connection = false,
    hasOauthLogin,
    isCardPayment,
    hasOauthUserDepositTransaction,
  } = selectAuthData(getState());

  if (authorizationToken) {
    service.getAccountGateway().addToken(authorizationToken);

    if (workerTokenData) {
      service.getWorkerGateway().addJwtToken(workerTokenData.signedToken);
    }
  }

  return {
    address,
    credentials,
    hasOauthLogin,
    hasWeb3Connection,
    isCardPayment,
    hasOauthUserDepositTransaction,
    walletMeta,
    workerTokenData,
  };
};

export const loginAndCache = async (
  web3Service: MultiRpcWeb3Sdk,
  service: MultiRpcSdk,
  dispatch: AppDispatch,
  hasOauthLogin?: boolean,
): Promise<IConnect> => {
  const { currentAccount } = web3Service.getKeyProvider();

  const { jwtToken: credentials, workerTokenData } =
    await web3Service.getIssuedJwtTokenOrIssue(currentAccount);

  if (!hasOauthLogin) {
    const authorizationToken = await dispatch(
      infrastructureAuthorizeProvider.initiate(),
    ).unwrap();

    if (authorizationToken) {
      const ethAddressType = EthAddressType.User;

      service.getAccountGateway().addToken(authorizationToken);

      if (credentials) {
        const { data: { address = '', email = '' } = {} } = await dispatch(
          userSettingsGetActiveEmailBinding.initiate({
            params: undefined,
            shouldNotify: false,
          }),
        );

        dispatch(
          setAuthData({ address, authorizationToken, email, ethAddressType }),
        );
      } else {
        dispatch(setAuthData({ authorizationToken, ethAddressType }));
      }
    }
  }

  if (workerTokenData) {
    service.getWorkerGateway().addJwtToken(workerTokenData.signedToken);
  }

  const keyProvider = web3Service.getKeyProvider();
  const walletMeta = keyProvider.getWalletMeta();

  const authData = {
    address: currentAccount,
    credentials: credentials || undefined,
    hasOauthLogin,
    hasWeb3Connection: true,
    isCardPayment: false,
    walletMeta,
    workerTokenData,
  };

  dispatch(setAuthData(authData));

  return authData;
};

export const disconnectService = () => {
  MultiService.removeServices();
};
