import { Web3Address } from '../../common';
import { IGoogleSecretCodeParams } from '../googleOauth';

export enum OauthLoginProvider {
  Github = 'github',
  Google = 'google',
  Email = 'email',
}

export interface IOauthLoginParams {
  provider: OauthLoginProvider;
}

export interface AssociatedAccount {
  externalId: string;
  login: string;
  provider: OauthLoginProvider;
  email?: string;
  address?: Web3Address;
}

export interface IOauthSecretCodeParams extends IGoogleSecretCodeParams {
  provider?: OauthLoginProvider;
}

export interface ISecretCodeLoginQueryParams {
  provider: OauthLoginProvider;
}
