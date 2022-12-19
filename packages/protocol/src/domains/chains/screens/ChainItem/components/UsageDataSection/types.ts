import BigNumber from 'bignumber.js';

import { CountryMap } from 'domains/chains/actions/fetchChainTimeframeData';
import { UserRequestsByIpData } from 'domains/chains/hooks/useUserRequestsByIp';
import { Timeframe } from 'domains/chains/types';
import { TopRequestsResultData } from 'domains/chains/utils/userTopRequestsUtils';

export interface PublicStats {
  countries: CountryMap;
  error: any;
  loading: boolean;
  pristine: boolean;
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
  totalCached: BigNumber;
  totalCost?: number;
  totalRequests: BigNumber;
  totalRequestsHistory: Record<string, number>;
  userTopRequests?: TopRequestsResultData;
  userTopRequestsIp?: UserRequestsByIpData[];
  isLoggedIn?: boolean;
}
