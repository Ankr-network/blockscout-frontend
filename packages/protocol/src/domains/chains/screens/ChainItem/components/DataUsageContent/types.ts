import BigNumber from 'bignumber.js';

import { Country } from 'domains/chains/actions/fetchChainTimeframeData';
import { MethodRequest, StatsTimeframe } from 'domains/chains/types';

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
  isWalletConnected: boolean;
  loading: boolean;
  methodRequests: MethodRequest[];
  pristine: boolean;
  setTimeframe: (timeframe: StatsTimeframe) => void;
  switchTimeframe: () => void;
  timeframe: StatsTimeframe;
  totalCached: BigNumber;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
}
