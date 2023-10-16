import { UsageHistoryDataMapped } from '../../types';

export interface FormattedHistoryData extends UsageHistoryDataMapped {
  isFirst: boolean;
  length: number;
  opacity: number;
}
