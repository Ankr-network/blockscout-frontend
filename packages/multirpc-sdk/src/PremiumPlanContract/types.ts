import { IWeb3SendResult } from '@ankr.com/provider';
import Web3 from 'web3';
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
  web3: Web3;
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep?: number;
  filter?: Filter;
}
