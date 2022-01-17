import { Timeframe } from '@ankr.com/multirpc';

type TimeStamp = string;
type Count = number;

export type RequestsLog = Record<TimeStamp, Count>;

export interface ChainRequestsChartProps {
  timeframe: Timeframe;
  requestsLog: RequestsLog;
  loading?: boolean;
}
