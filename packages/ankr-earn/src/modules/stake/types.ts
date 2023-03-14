import { ITxEventsHistoryGroupItem } from '@ankr.com/staking-sdk';

export interface IBaseHistoryData {
  stakeEvents: ITxEventsHistoryGroupItem[];
  unstakeEvents: ITxEventsHistoryGroupItem[];
}
