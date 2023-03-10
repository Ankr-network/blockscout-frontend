import BigNumber from 'bignumber.js';

import { Token } from 'modules/common/types/token';

export interface IHistoryTableRow {
  amount?: BigNumber;
  date?: Date;
  hash?: string;
  link?: string;
}

export interface IHistoryDialogData {
  staked: IHistoryTableRow[];
  stakedToken: Token;
  unstaked: IHistoryTableRow[];
  unstakedToken: Token;
}
