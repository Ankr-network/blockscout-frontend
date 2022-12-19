import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IGatewayConfig } from './common/config';

export class AnkrAPIGateway {
  public api: AxiosInstance;

  constructor(gatewayConfig: IGatewayConfig) {
    const defaultConfig: AxiosRequestConfig = {
      baseURL: gatewayConfig.ankrApiBaseUrl,
      method: 'POST',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.api = axios.create(defaultConfig);
  }
}
