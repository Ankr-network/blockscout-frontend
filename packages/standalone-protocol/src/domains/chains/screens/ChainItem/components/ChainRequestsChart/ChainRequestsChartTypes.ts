import { ChainId } from 'domains/chains/api/chain';

type TimeStamp = string;
type Count = number;

export type RequestsLog = Record<TimeStamp, Count>;

export interface ChainRequestsChartProps {
  totalRequestsHistory: RequestsLog;
  totalCachedHistory: RequestsLog;
  className?: string;
  loading?: boolean;
  chainId: ChainId;
}
