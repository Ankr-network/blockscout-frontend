import { UsageHistoryData } from 'domains/dashboard/store/types';

export interface FormattedHistoryData extends UsageHistoryData {
  isFirst: boolean;
  length: number;
  opacity: number;
}
