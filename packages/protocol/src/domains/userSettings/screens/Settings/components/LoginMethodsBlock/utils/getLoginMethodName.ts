import { t } from '@ankr.com/common';
import { OauthLoginProvider } from 'multirpc-sdk';

export const getLoginMethodName = (provider: OauthLoginProvider) => {
  switch (provider) {
    case OauthLoginProvider.Email:
      return t('user-settings.login-methods.metamask');
    case OauthLoginProvider.Github:
      return t('user-settings.login-methods.github');
    case OauthLoginProvider.Google:
    default:
      return t('user-settings.login-methods.gmail');
  }
};
