import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IGatewayConfig } from '../common';

export class AnkrAPIGateway {
  public api: AxiosInstance;

  constructor(gatewayConfig: IGatewayConfig) {
    const defaultConfig: AxiosRequestConfig = {
      baseURL: gatewayConfig.ankrApiBaseUrl,
      method: 'POST',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': gatewayConfig.ankrApiKey,
      },
    };

    this.api = axios.create(defaultConfig);
  }
}
