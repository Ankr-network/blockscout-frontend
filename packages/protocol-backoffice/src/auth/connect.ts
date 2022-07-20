import { notification } from 'antd';

import { MultiService } from 'api/MultiService';
import { LIFETIME } from './connectUtils';

export const AUTH_STATE_KEY = '__authState';
export const ADDRESS_STATE_KEY = '__addressState';

const getSavedToken = (): string | undefined => {
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

const getSavedAddress = (): string | undefined => {
  const address = localStorage.getItem(ADDRESS_STATE_KEY);

  if (!address) return undefined;

  try {
    return JSON.parse(address);
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error(`Failed to parse address from address state: ${e}`);
  }

  return undefined;
};

const rememberUserLoginState = (
  authorizationToken: string,
  address: string,
) => {
  localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authorizationToken));
  localStorage.setItem(ADDRESS_STATE_KEY, JSON.stringify(address));
};

export const connect = async () => {
  const service = await MultiService.getInstance();

  const authorizationToken = getSavedToken();
  const address = getSavedAddress();
  const { currentAccount } = service.getKeyProvider();

  if (authorizationToken && currentAccount === address) {
    service.getBackofficeGateway().addToken(authorizationToken);

    return;
  }

  try {
    const newAuthorizationToken = await service.authorizeBackoffice(LIFETIME);
    service.getBackofficeGateway().addToken(newAuthorizationToken);

    if (newAuthorizationToken) {
      rememberUserLoginState(newAuthorizationToken, currentAccount);
    } else {
      notification.error({
        message: 'Failed to login',
      });
    }
  } catch (error) {
    notification.error({
      message: `Failed to login ${error}`,
    });
  }
};
