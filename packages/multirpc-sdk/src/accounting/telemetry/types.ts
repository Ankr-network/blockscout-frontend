import { Address } from '@ankr.com/provider';
import { Timestamp } from '@ankr.com/utils';

import { IApiUserGroupParams } from '../userGroup';
import { BlockchainID, Timeframe, Web3Address } from '../../common';

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

export interface IRequestTimelinePoint {
  time: number; // "1710460800"
  value: number; // "22282"
}

export interface IRequestTimeline {
  name: string; // "Usage",
  points: IRequestTimelinePoint[];
}

export interface IUsageTopElement {
  name: string;
  count: number;
}

export interface IUsageTop {
  top_of: ETelemetryTopOf;
  elements: IUsageTopElement[];
}

export interface IUsageStats {
  total: number;
  all_time_total: number;
  request_timelines: IRequestTimeline[];
  tops?: IUsageTop[];
}

export enum ETelemetryGroupBy {
  UNSPECIFIED = 'unspecified',
  TENAT = 'tenat',
  API_KEY = 'api_key',
  PROTOCOL = 'protocol',
  BLOCKCHAIN = 'blockchain',
  METHOD = 'method',
}

export enum ETelemetryTopOf {
  UNSPECIFIED = 'unspecified',
  IP = 'ip',
  ERROR = 'error',
  COUNTRY = 'country',
  METHOD = 'method',
  BLOCKCHAIN = 'blockchain',
  PROTOCOL = 'protocol',
  TENANT = 'tenant',
  API_KEY = 'api_key',
  MONTHLY_USAGE = 'monthly_usage',
}

export enum EPrivateStatsInterval {
  HOUR = '1h',
  DAY = '24h',
}

export interface IUsageStatsParams {
  group: Web3Address;

  /** The time interval to query for */
  // stats start timestamp in ms
  from?: number;
  // stats end timestamp in ms
  to?: number;
  // stats interval duration, valid time units are “ns”, “us” (or “µs”), “ms”, “s”, “m”, “h”: 1h, 2h...
  intervalDuration: EPrivateStatsInterval;

  /** Filters */
  tenantIds?: string[];
  apiKeyIds?: string[];
  protocols?: string[];
  blockchains?: string[];
  methods?: string[];
  topLimit?: number;
  /** Stats grouping */
  groupBy?: ETelemetryGroupBy[];
  /** use this param to request additional top lists */
  includeTopOfs?: ETelemetryTopOf[];
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
