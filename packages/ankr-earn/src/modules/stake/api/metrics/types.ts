export type TServiceName =
  // Common
  | 'eth'
  | 'polygon'
  | 'avax'
  | 'bnb'
  | 'ftm'
  | 'ksm'
  | 'dot'

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
