import { Timeframe } from '@ankr.com/chains-list';

export interface RequestsChartProps {
  isConnecting: boolean;
  isLoggedIn?: boolean;
  loading: boolean;
  isFlexibleHeight?: boolean;
  timeframe: Timeframe;
  totalRequestsHistory?: Record<string, number>;
}
