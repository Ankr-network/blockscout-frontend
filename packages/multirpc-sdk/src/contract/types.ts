import type { IWeb3SendResult } from '@ankr.com/stakefi-web3';

import { PrefixedHex } from '../common';

export interface IContractManagerConfig {
  ankrTokenContractAddress: PrefixedHex;
  ankrWalletContractAddress: PrefixedHex;
}

export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}