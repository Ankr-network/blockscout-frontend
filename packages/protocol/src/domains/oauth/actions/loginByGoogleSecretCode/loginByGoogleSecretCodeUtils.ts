import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  EthAddressType,
  IEthUserAddress,
  OauthLoginProvider,
} from 'multirpc-sdk';

import { GetState } from 'store';
import { Web2SignUpTrackingParams } from 'modules/analytics/mixpanel/types';
import { selectAuthData } from 'domains/auth/store/authSlice';
import { selectHasPremium } from 'domains/auth/store/selectors';
import { trackWeb2SignUpSuccess } from 'modules/analytics/mixpanel/trackWeb2SignUpSuccess';
import { MultiService } from 'modules/api/MultiService';

export enum OauthRedirectionURLError {
  AccessDenied = 'access_denied',
}

export interface OauthRedirectionURLErrorState {
  error: OauthRedirectionURLError | null;
  error_description?: string | null;
  error_uri?: string | null;
}

export interface OauthRedirectionURLState {
  code: string | null;
  state: string | null;
  provider: OauthLoginProvider | null;
}

export interface SecretCodeData {
  secret_code: string;
  state: string;
}

export const getSecreteCodeAndState = (): OauthRedirectionURLState &
  OauthRedirectionURLErrorState => {
  const redirectedURL = new URL(window.location.href);

  return {
    code: redirectedURL.searchParams.get('code'),
    state: redirectedURL.searchParams.get('state'),
    provider: redirectedURL.searchParams.get(
      'provider',
    ) as OauthRedirectionURLState['provider'],
    error: redirectedURL.searchParams.get(
      'error',
    ) as OauthRedirectionURLErrorState['error'],
  };
};

export const buildSecretCodeData = (
  secretCode: string,
  state = '',
): SecretCodeData => ({
  secret_code: secretCode,
  state,
});

export const getEthUserAddress = (addresses: IEthUserAddress[]) => {
  const userAddress = addresses.find(item => item.type === EthAddressType.User);

  if (userAddress) return userAddress;

  return addresses.find(item => item.type === EthAddressType.Generated);
};

export const getTrackingParams = (
  getState: GetState,
): Web2SignUpTrackingParams => {
  const state = getState();
  const { email } = selectAuthData(state);
  const hasPremium = selectHasPremium(state);

  return { email, hasPremium };
};

export const trackLoginSuccess = async ({
  getState,
}: Pick<BaseQueryApi, 'getState'>) => {
  trackWeb2SignUpSuccess(getTrackingParams(getState as GetState));
};

export const bindAccountToLoggedInUser = async (
  authorizationToken: string,
  { code, state, provider }: OauthRedirectionURLState,
) => {
  const service = MultiService.getService();

  service.getOauthGateway().addToken(authorizationToken);

  if (provider) {
    return service.getOauthGateway().bindOauthAccount({
      ...buildSecretCodeData(code || '', state || ''),
      provider,
    });
  }

  return service.getOauthGateway().bindGoogleAccount({
    ...buildSecretCodeData(code || '', state || ''),
  });
};
