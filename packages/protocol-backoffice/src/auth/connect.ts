import { MultiService, web3KeyProvider } from 'api/MultiService';
import { LIFETIME } from './connectUtils';

export const AUTH_STATE_KEY = '__authState';

const tryGetTokenFromLoginState = (): string | undefined => {
  const authorizationToken = localStorage.getItem(AUTH_STATE_KEY);

  if (!authorizationToken) return undefined;

  try {
    return JSON.parse(authorizationToken);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse JWT token from login state: ${e}`);
  }

  return undefined;
};

const rememberUserLoginState = (authorizationToken: string) => {
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authorizationToken));
};

const { service } = MultiService.getInstance();

export const connect = async () => {
  await web3KeyProvider.connectFromInjected();

  const authorizationToken = tryGetTokenFromLoginState();

  if (authorizationToken) {
    service.getBackofficeGateway().addToken(authorizationToken);

    return;
  }

  try {
    const newAuthorizationToken = await service.authorizeBackoffice(LIFETIME);
    service.getBackofficeGateway().addToken(newAuthorizationToken);

    if (authorizationToken) {
      rememberUserLoginState(authorizationToken);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Failed to login`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e, 'Failed to login');
  }
};
