import BigNumber from 'bignumber.js';

export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}

export interface ITxEventsHistoryData {
  completed: ITxEventsHistoryGroupItem[];
  pending: ITxEventsHistoryGroupItem[];
}
