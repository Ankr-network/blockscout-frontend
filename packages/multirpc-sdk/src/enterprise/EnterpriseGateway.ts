import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';

export class EnterpriseGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  public async checkIsClient(): Promise<boolean> {
    return true;
  }
}
