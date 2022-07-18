import { notification } from 'antd';

import { MultiService } from 'api/MultiService';
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

export const connect = async () => {
  const service = await MultiService.getInstance();

  const authorizationToken = tryGetTokenFromLoginState();

  if (authorizationToken) {
    service.getBackofficeGateway().addToken(authorizationToken);

    return;
  }

  try {
    const newAuthorizationToken = await service.authorizeBackoffice(LIFETIME);
    service.getBackofficeGateway().addToken(newAuthorizationToken);

    if (newAuthorizationToken) {
      rememberUserLoginState(newAuthorizationToken);
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
