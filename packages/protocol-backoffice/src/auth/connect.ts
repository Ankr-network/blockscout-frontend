import { IJwtToken } from 'multirpc-sdk';

import { MultiService, web3KeyProvider } from 'api/MultiService';
import { LIFETIME } from './connectUtils';

export const LOGIN_STATE_KEY = '__loginState';
export const AUTH_STATE_KEY = '__authState';

interface LoginState {
  jwtToken: IJwtToken;
  authorizationToken: string;
}

const tryGetTokenFromLoginState = (): LoginState | undefined => {
  const data = localStorage.getItem(LOGIN_STATE_KEY);
  const authorizationToken = localStorage.getItem(AUTH_STATE_KEY);

  if (!data || !authorizationToken) return undefined;

  try {
    return {
      jwtToken: JSON.parse(data) as IJwtToken,
      authorizationToken: JSON.parse(authorizationToken),
    };
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse JWT token from login state: ${e}`);
  }

  return undefined;
};

const rememberUserLoginState = (
  jwtToken: IJwtToken,
  authorizationToken: string,
) => {
  localStorage.setItem(LOGIN_STATE_KEY, JSON.stringify(jwtToken));
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authorizationToken));
};

const { service } = MultiService.getInstance();

export const connect = async () => {
  await web3KeyProvider.connectFromInjected();

  const currentAccount = web3KeyProvider.currentAccount();
  const tokens = tryGetTokenFromLoginState();

  if (
    tokens?.jwtToken &&
    tokens?.jwtToken.owner_address.toLowerCase() ===
      currentAccount.toLowerCase() &&
    tokens?.authorizationToken
  ) {
    const { jwtToken, authorizationToken } = tokens;

    service.getWorkerBackofficeGateway().addJwtToken(jwtToken);
    service.getBackofficeGateway().addToken(authorizationToken);

    return;
  }

  try {
    const newJwtToken = await service.loginAsAdmin(currentAccount);

    const authorizationToken = await service.authorizeBackoffice(LIFETIME);
    service.getBackofficeGateway().addToken(authorizationToken);

    if (newJwtToken) {
      service.getWorkerBackofficeGateway().addJwtToken(newJwtToken);
    }

    if (newJwtToken && authorizationToken) {
      rememberUserLoginState(newJwtToken, authorizationToken);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Failed to login`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'Failed to login');
  }
};
