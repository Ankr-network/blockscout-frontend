import { Timeframe } from 'domains/chains/types';

export interface RequestsChartProps {
  isConnecting: boolean;
  isLoggedIn?: boolean;
  loading: boolean;
  timeframe: Timeframe;
  totalRequestsHistory?: Record<string, number>;
}
