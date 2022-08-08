import { IWeb3SendResult } from '@ankr.com/provider';

import { PrefixedHex } from '../common';

export interface IContractManagerConfig {
  ankrTokenContractAddress: PrefixedHex;
  premiumPlanContractAddress: PrefixedHex;
}

export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}
