import { ITxHistoryItem } from '@ankr.com/staking-sdk';

import { Token } from 'modules/common/types/token';

export interface IHistoryTableProps {
  unstakeHistory?: ITxHistoryItem[];
  stakeHistory?: ITxHistoryItem[];
  token: Token;
  isUnstakedActive?: boolean;
}
