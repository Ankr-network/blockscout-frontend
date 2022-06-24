import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IGatewayConfig } from '../common';

export type SidecarStatus =
  | 'SIDECAR_STATUS_UNKNOWN'
  | 'SIDECAR_STATUS_SYNCING'
  | 'SIDECAR_STATUS_ACTIVE'
  | 'SIDECAR_STATUS_DISABLED'
  | 'SIDECAR_STATUS_BLOCKED'
  | 'SIDECAR_STATUS_OFFLINE'
  | 'SIDECAR_STATUS_ATTESTING';

export class ApiGateway {
  private readonly defaultConfig: AxiosRequestConfig;

  public api: AxiosInstance;

  constructor(gatewayConfig: IGatewayConfig) {
    this.defaultConfig = {
      baseURL: gatewayConfig.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    };
    this.api = axios.create(this.defaultConfig);
  }
}
