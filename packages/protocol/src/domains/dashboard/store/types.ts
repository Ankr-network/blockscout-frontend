import {
  BlockchainStatsCount,
  BlockchainStatsTimestamp,
  PrivateStatsResponse,
} from 'multirpc-sdk';

import { JWT } from 'domains/jwtToken/store/jwtTokenManagerSlice';

export type AggregatedUsageHistory = Record<
  Month,
  BlockchainStatsCount['count']
>;

export interface Location {
  continent: string;
  hasCheckMarkIcon?: boolean;
}

export type Month = string;

export type Requests = Record<
  BlockchainStatsTimestamp,
  BlockchainStatsCount['count']
>;

export type RequestsEntry = [
  BlockchainStatsTimestamp,
  BlockchainStatsCount['count'],
];

export interface UsageHistoryData {
  calls: number;
  month: Month;
}

export interface ICurrentProjectsStats {
  index: JWT['index'];
  name: JWT['name'];
  stats?: PrivateStatsResponse;
}
