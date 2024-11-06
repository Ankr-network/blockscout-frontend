import BigNumber from 'bignumber.js';
import { BlockchainStatsTopRequests } from 'multirpc-sdk';
import { Timeframe } from '@ankr.com/chains-list';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';

export interface PublicStats {
  countries: CountryMap;
  error: any;
  isLoading: boolean;
  isUninitialized: boolean;
  totalCached: BigNumber;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
}

export interface UsageData {
  countries?: CountryMap;
  error: any;
  isConnecting: boolean;
  loading: boolean;
  timeframe: Timeframe;
  totalCached?: BigNumber;
  totalCost?: number;
  totalRequests: BigNumber;
  totalRequestsHistory?: Record<string, number>;
  userTopRequests?: BlockchainStatsTopRequests[];
  userTopRequestsIp?: UserRequestsByIpData[];
  isLoggedIn?: boolean;
}
