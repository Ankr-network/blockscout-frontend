import { PrivateStatCount, PrivateStatTimestamp } from 'multirpc-sdk';

import { PieChartData } from '../screens/Dashboard/components/BasePieChart';

export type AggregatedUsageHistory = Record<Month, PrivateStatCount['count']>;

export interface Location {
  continent: string;
  hasCheckMarkIcon?: boolean;
}

export type Month = string;

export type Requests = Record<PrivateStatTimestamp, PrivateStatCount['count']>;

export type RequestsEntry = [PrivateStatTimestamp, PrivateStatCount['count']];

export interface UsageHistoryData {
  calls: number;
  month: Month;
}

export type ProjectsStats = PieChartData;
