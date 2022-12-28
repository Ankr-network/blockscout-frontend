import axios, { AxiosInstance } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import {
  IOauthLoginParams,
  IOauthLoginResponse,
  ISecreteCodeLoginParams,
  IETHAddressesResponse,
  IDecodeJwtTokenParams,
  IDecodeJwtTokenResponse,
  ISyntheticJwtTokenResponse,
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

  async getOauthLoginParams(): Promise<IOauthLoginParams> {
    const { data } = await this.api.get<IOauthLoginParams>(
      '/api/v1/googleOauth/getGoogleOauthParams',
    );

    return data;
  }

  async loginUserByGoogleSecretCode(
    body: ISecreteCodeLoginParams,
  ): Promise<IOauthLoginResponse> {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/googleOauth/loginUserByGoogleSecretCode',
      body,
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

  async getSyntheticJwtToken(): Promise<ISyntheticJwtTokenResponse> {
    const { data } = await this.api.get<ISyntheticJwtTokenResponse>(
      '/api/v1/auth/jwt/getMySyntheticJwt',
    );

    return data;
  }
}
