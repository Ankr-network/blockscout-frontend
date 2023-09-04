import { Address } from '@ankr.com/provider';

import { IGoogleSecretCodeParams } from '../googleOauth';

export enum OauthLoginProvider {
  Github = 'github',
}

export interface IOauthLoginParams {
  provider: OauthLoginProvider;
}

export interface AssociatedAccount {
  address: Address;
  externalId: string;
  login: string;
  provider: OauthLoginProvider;
}

export interface IOauthSecretCodeParams extends IGoogleSecretCodeParams {
  provider?: OauthLoginProvider;
}

export interface ISecreteCodeLoginQueryParams {
  provider: OauthLoginProvider;
}
