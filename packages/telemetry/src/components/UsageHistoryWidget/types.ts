import { UsageHistoryData } from '../../types';

export interface FormattedHistoryData extends UsageHistoryData {
  isFirst: boolean;
  length: number;
  opacity: number;
}
