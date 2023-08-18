import axios, { AxiosInstance } from 'axios';

import { AXIOS_DEFAULT_CONFIG, createTOTPHeaders } from '../common';
import {
  IGoogleLoginParamsResponse,
  IOauthLoginResponse,
  ISecreteCodeLoginParams,
  IETHAddressesResponse,
  IDecodeJwtTokenParams,
  IDecodeJwtTokenResponse,
  ISyntheticJwtTokenResponse,
  IOauthLoginParams,
  ISecreteCodeLoginQueryParams,
  AssociatedAccount,
  IGoogleSecretCodeParams,
  IOauthSecretCodeParams,
} from './types';

export class OauthGateway {
  public api: AxiosInstance;

  constructor(private readonly url: string) {
    this.api = axios.create({
      ...AXIOS_DEFAULT_CONFIG,
      baseURL: url,
    });
  }

  addToken(token: string) {
    this.api = axios.create({
      ...AXIOS_DEFAULT_CONFIG,
      baseURL: this.url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getGoogleLoginParams() {
    const { data } = await this.api.get<IGoogleLoginParamsResponse>(
      '/api/v1/googleOauth/getGoogleOauthParams',
    );

    return data;
  }

  async loginUserByGoogleSecretCode(
    body: ISecreteCodeLoginParams,
    totp?: string,
  ): Promise<IOauthLoginResponse> {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/googleOauth/loginUserByGoogleSecretCode',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async loginBySecretCode(
    body: ISecreteCodeLoginParams,
    params: ISecreteCodeLoginQueryParams,
    totp?: string,
  ) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/oauth2/loginBySecretCode',
      body,
      {
        params,
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async bindGoogleAccount(body: IGoogleSecretCodeParams, totp?: string) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/auth/googleOauth/bindEmail',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async bindOauthAccount(body: IOauthSecretCodeParams, totp?: string) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/auth/abstractBindings/bind',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async getETHAddresses(accessToken: string): Promise<IETHAddressesResponse> {
    const { data } = await this.api.get<IETHAddressesResponse>(
      '/api/v1/auth/googleOauth/getAllMyEthAddresses',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async decodeJwtToken(
    body: IDecodeJwtTokenParams,
  ): Promise<IDecodeJwtTokenResponse> {
    const { data } = await this.api.post<IDecodeJwtTokenResponse>(
      '/api/v1/auth/googleOauth/decodeJwtToken',
      body,
    );

    return data;
  }

  async getSyntheticJwtToken(
    totp?: string,
  ): Promise<ISyntheticJwtTokenResponse> {
    const { data } = await this.api.get<ISyntheticJwtTokenResponse>(
      '/api/v1/auth/jwt/getMySyntheticJwt',
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async getOauthLoginParams({ provider }: IOauthLoginParams) {
    const { data } = await this.api.get<IGoogleLoginParamsResponse>(
      '/api/v1/oauth2/getProviderParams',
      { params: { provider } },
    );

    return data;
  }

  async getAssociatedAccounts() {
    const { data } = await this.api.get<AssociatedAccount[]>(
      '/api/v1/auth/abstractBindings/list',
    );

    return data;
  }
}
