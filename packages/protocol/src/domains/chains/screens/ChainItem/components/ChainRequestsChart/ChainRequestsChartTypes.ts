import { StatsTimeframe } from 'domains/chains/types';

type TimeStamp = string;
type Count = number;

export type RequestsLog = Record<TimeStamp, Count>;

export interface ChainRequestsChartProps {
  timeframe: StatsTimeframe;
  requestsLog: RequestsLog;
  loading?: boolean;
}
