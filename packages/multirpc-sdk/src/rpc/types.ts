import { AxiosRequestConfig } from 'axios';

export interface IBaseRpcConfig extends AxiosRequestConfig {
  baseURL: string;
}