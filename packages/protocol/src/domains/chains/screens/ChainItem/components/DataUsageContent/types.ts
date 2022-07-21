import BigNumber from 'bignumber.js';

import { Country } from 'domains/chains/actions/fetchChainTimeframeData';
import { StatsTimeframe } from 'domains/chains/types';

export interface PublicStats {
  countries: Country;
  error: any;
  loading: boolean;
  pristine: boolean;
  totalCached: BigNumber;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
}

export interface UsageData {
  countries?: Country;
  error: any;
  isConnecting: boolean;
  isWalletConnected: boolean;
  loading: boolean;
  pristine: boolean;
  setTimeframe: (timeframe: StatsTimeframe) => void;
  timeframe: StatsTimeframe;
  totalCached: BigNumber;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
}
