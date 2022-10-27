import { IWeb3SendResult } from '@ankr.com/provider-core';
import { Contract, Filter } from 'web3-eth-contract';

import { PrefixedHex } from '../common';

export interface IContractManagerConfig {
  ankrTokenContractAddress: PrefixedHex;
  premiumPlanContractAddress: PrefixedHex;
  premiumPlanContractCreationBlockNumber: number;
}

export interface IDepositAnkrToWalletResult {
  allowance?: IWeb3SendResult;
  deposit: IWeb3SendResult;
}

export interface IGetPastEvents {
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep?: number;
  filter?: Filter;
}
