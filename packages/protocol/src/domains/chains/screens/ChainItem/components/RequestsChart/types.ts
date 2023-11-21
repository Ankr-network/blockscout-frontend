import { Timeframe } from 'modules/chains/types';

export interface RequestsChartProps {
  isConnecting: boolean;
  isLoggedIn?: boolean;
  loading: boolean;
  isFlexibleHeight?: boolean;
  timeframe: Timeframe;
  totalRequestsHistory?: Record<string, number>;
}
