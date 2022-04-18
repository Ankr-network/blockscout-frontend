import axios, { AxiosInstance } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import { IBaseRpcConfig } from './types';

export abstract class BaseRpc {
  protected api: AxiosInstance;

  protected baseApi: AxiosInstance;

  constructor(config: IBaseRpcConfig) {
    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG, ...config });
    this.baseApi = axios.create(AXIOS_DEFAULT_CONFIG);
  }

  public abstract validateNode(url: string): Promise<boolean>;
}
