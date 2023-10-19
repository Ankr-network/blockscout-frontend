import { IGoogleSecretCodeParams } from '../googleOauth';

export enum OauthLoginProvider {
  Github = 'github',
  Google = 'google',
}

export interface IOauthLoginParams {
  provider: OauthLoginProvider;
}

export interface AssociatedAccount {
  externalId: string;
  login: string;
  provider: OauthLoginProvider;
  email?: string;
}

export interface IOauthSecretCodeParams extends IGoogleSecretCodeParams {
  provider?: OauthLoginProvider;
}

export interface ISecreteCodeLoginQueryParams {
  provider: OauthLoginProvider;
}
