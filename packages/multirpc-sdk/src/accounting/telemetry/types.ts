import { Address } from '@ankr.com/provider';
import { Timestamp } from '@ankr.com/utils';

import { IApiUserGroupParams } from '../userGroup';
import { BlockchainID, Timeframe } from '../../common';

export interface IGetLatestRequestsRequest {
  from_ms?: number;
  to_ms?: number;
  cursor?: number;
  group?: Address;
  limit: number;
}

export interface IGetLatestRequestsResponse {
  user_requests: LatestRequest[];
}

export interface LatestRequest {
  blockchain: string;
  premium_id: string;
  payload: string;
  ts: number;
  ip: string;
  country: string;
}

export interface StatsByRangeRequest extends IApiUserGroupParams {
  duration?: StatsByRangeDuration;
  from?: Timestamp;
  monthly?: boolean;
  timeframe?: StatsByRangeTimeframe;
  to?: Timestamp;
  token?: string;
}

export enum StatsByRangeDuration {
  HOUR = '1h',
  TWO_HOURS = '2h',
  DAY = '1d',
  TWO_DAYS = '2d',
  MONTH = '1mo',
  SIX_MONTH = '6m',
}

export enum StatsByRangeTimeframe {
  FIVE_MINUTES = '5m',
  HOUR = '1h',
  DAY = '1d',
}

export type StatsByRangeResponse = Record<string, number>;

export enum PrivateStatsInterval {
  HOUR = 'h1',
  DAY = 'h24',
  WEEK = 'd7',
  MONTH = 'd30',
}

export interface PrivateStats {
  error?: string;
  stats?: PrivateStatsInternal;
  total_requests?: number;
  totalRequests?: number;
}

export type PrivateStatsInternal = Partial<Record<BlockchainID, PrivateStat>>;

export interface PrivateStat {
  blockchain: string;
  countries_count: PrivateStatCountriesCount;
  counts?: PrivateStatCounts;
  ips_count: PrivateStatIPsCount;
  total: PrivateTotalRequestsInfo;
  total_requests: number;
  totalRequests: number;
}

export interface PrivateStatCountriesCount {
  others_info: PrivateStatOthersInfo;
  top_countries: PrivatStatTopCountry[];
}

export type PrivateStatOthersInfo = {
  request_count?: number;
  type_count?: number;
  total_cost?: number;
};

export interface PrivatStatTopCountry {
  country: string;
  count: number;
  total_cost: number;
}

export type PrivateStatCounts = Record<PrivateStatTimestamp, PrivateStatCount>;

// in ms
export type PrivateStatTimestamp = string;

export interface PrivateStatCount {
  count: number;
  top_requests: PrivateStatTopRequests[];
  others_info: PrivateStatOthersInfo;
}

export type RPCRequestName = string;

export interface PrivateStatTopRequests {
  method: RPCRequestName;
  count: number;
  total_cost: number;
  totalCost?: string; // used in backoffice stats response
}

export interface PrivateStatIPsCount {
  others_info?: PrivateStatOthersInfo;
  top_ips?: IpDetails[];
}

export interface IpDetails {
  ip: string;
  count: number;
  total_cost: number;
}

export interface PrivateTotalRequestsInfo {
  count: number;
  others_info: PrivateStatOthersInfo;
  top_requests: PrivateStatTopRequests[];
  topRequests: PrivateStatTopRequests[];
  total_cost?: number;
  totalCost?: number;
}

export interface IApiPrivateStats {
  stats?: PrivateStatsInternal;
  total_requests?: number;
}

export interface Top10StatsParams extends IApiUserGroupParams {
  /* backend does not support h1 and h24 interval for this endpoint  */
  intervalType: PrivateStatsInterval.WEEK | PrivateStatsInterval.MONTH;
  blockchain?: string;
}

export interface Top10StatItem {
  key: string;
  value: number;
}

export interface Top10StatsResponse {
  ips: Top10StatItem[];
  countries: Top10StatItem[];
}

type ChartDate = string;
export type PrivateStatTopRequestsData = Record<string, number | ChartDate>;

export type UserRequest = Record<string, number>;
export type UserRequestsResponse = Record<string, UserRequest>;


export interface TotalStatsResponse {
  blockchains_info: TotalStatsBlockchainsInfo;
}

export interface TotalStatsBlockchainsInfo {
  blockchains: TotalStatsBlockchains;
  premium_tokens: TotalStatsPremiumTokens;
  started_ms: number;
  total_cost: number;
  total_count: number;
}

export type TotalStatsBlockchains = Record<BlockchainID, TotalStatsBlockchain>;

export type TotalStatsPremiumTokens = Record<
  UserEndpointToken,
  TotalStatsPremiumToken
>;

export interface TotalStatsBlockchain {
  total_cost: number;
  total_count: number;
}

export type UserEndpointToken = string;

export type TotalStatsPremiumToken = Omit<
  TotalStatsBlockchainsInfo,
  'premium_tokens'
>;

export type IApiGetUserRequestsParams = IApiUserGroupParams & {
  timeframe: Timeframe;
  userToken: string;
};

export interface IDailyChargingParams extends IApiUserGroupParams {
  day_offset: number;
}

export type IDailyChargingResponse = string;
