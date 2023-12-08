import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IUAuthGateway } from "./interfaces";
import {
  IGetOauth2ParamsRequest,
  IGetOauth2ParamsSuccessResponse,
  IPostSecretCodeRequest,
  IPostSecretCodeResponse,
} from './types';
import { AXIOS_DEFAULT_CONFIG } from '../common';

export class UAuthGateway implements IUAuthGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  async getAuthLink(params: IGetOauth2ParamsRequest): Promise<IGetOauth2ParamsSuccessResponse> {
    const { data: response } = await this.api.get<IGetOauth2ParamsSuccessResponse>(
      '/getOauth2Params',
      {
        params,
      },
    );

    return response;
  }

  async updateCredentials(body: IPostSecretCodeRequest): Promise<IPostSecretCodeResponse> {
    const { data: response } = await this.api.post<IPostSecretCodeResponse>(
      '/loginUserByOauth2SecretCode',
      body,
    );

    return response;
  }
}