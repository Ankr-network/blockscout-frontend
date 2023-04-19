import BigNumber from 'bignumber.js';
import { PrivateStatTopRequests } from 'multirpc-sdk';

import { CountryMap } from 'domains/chains/actions/public/fetchChainTimeframeData';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';

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
  totalRequestsHistory: Record<string, number>;
  userTopRequests?: PrivateStatTopRequests[];
  userTopRequestsIp?: UserRequestsByIpData[];
  isLoggedIn?: boolean;
}