import { UsageHistoryDataType } from '../../types';

export interface FormattedHistoryData extends UsageHistoryDataType {
  isFirst: boolean;
  length: number;
  opacity: number;
}
