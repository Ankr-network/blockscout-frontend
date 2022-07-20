import { IWeb3SendResult } from '@ankr.com/provider';

import { PrefixedHex } from '../common';

export interface IContractManagerConfig {
  ankrTokenContractAddress: PrefixedHex;
  ankrWalletContractAddress: PrefixedHex;
}

export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}
