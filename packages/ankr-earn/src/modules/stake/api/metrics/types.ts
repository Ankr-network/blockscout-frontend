export type TServiceName =
  | 'eth'
  | 'polygon'
  | 'avax'
  | 'bnb'
  | 'ftm'
  | 'ksm'
  | 'dot';

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
