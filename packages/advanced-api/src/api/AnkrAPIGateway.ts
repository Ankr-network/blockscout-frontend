import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class AnkrAPIGateway {
  public api: AxiosInstance;

  constructor(baseURL: string) {
    const defaultConfig: AxiosRequestConfig = {
      baseURL,
      method: 'POST',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.api = axios.create(defaultConfig);
  }
}
