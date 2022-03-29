import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IBaseRpcConfig extends AxiosRequestConfig {
  baseURL: string;
}

const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
};

export abstract class BaseRpc {
  protected api: AxiosInstance;

  protected baseApi: AxiosInstance;

  constructor(config: IBaseRpcConfig) {
    this.api = axios.create({ ...AXIOS_DEFAULT_CONFIG, ...config });
    this.baseApi = axios.create(AXIOS_DEFAULT_CONFIG);
  }

  public abstract validateNode(url: string): Promise<boolean>;
}
