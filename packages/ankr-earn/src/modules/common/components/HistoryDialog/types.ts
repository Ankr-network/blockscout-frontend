import BigNumber from 'bignumber.js';

import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

export interface IHistoryDialogRow {
  amount?: BigNumber;
  date?: Date;
  hash?: string;
  link?: string;
}

export interface IHistoryData {
  stakeEvents: IHistoryDialogRow[];
  unstakeEvents: IHistoryDialogRow[];
}

export interface IBaseHistoryData {
  stakeEvents: ITxEventsHistoryGroupItem[];
  unstakeEvents: ITxEventsHistoryGroupItem[];
}

export interface IUseCommonHistoryHandler {
  loading: boolean;
  handleLoadTxHistory: (weeksAmount: number) => void;
}
