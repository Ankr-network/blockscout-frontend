export type TServiceName =
  // Common
  | 'eth'
  | 'eth-ssv'
  | 'polygon'
  | 'avax'
  | 'bnb'
  | 'ftm'
  | 'ksm'
  | 'dot'
  | 'ankr'

  // DEV mode only
  | 'wnd';

interface IMetricsService {
  serviceName: TServiceName;
  totalStaked: string;
  stakers: string;
  apy: string;
  totalStakedUsd: string;
}

export interface IMetricsResponse {
  services: IMetricsService[];
}
