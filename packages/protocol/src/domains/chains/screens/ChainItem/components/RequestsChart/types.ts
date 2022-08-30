import { Timeframe } from 'domains/chains/types';

export interface RequestsChartProps {
  isConnecting: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  timeframe: Timeframe;
  totalRequestsHistory?: Record<string, number>;
}
