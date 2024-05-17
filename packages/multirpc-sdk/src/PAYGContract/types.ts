import BigNumber from 'bignumber.js';

import { EBlockchain, PrefixedHex, Web3Address } from '../common';

export interface IAnkrPAYGContractManagerConfig {
  payAsYouGoAnkrTokenContractAddress: PrefixedHex;
  payAsYouGoContractAddress: PrefixedHex;
  payAsYouGoContractCreationBlockNumber: number;
  advancedApiUrl: string;
}

export interface SendDepositTransactionForUserParams {
  depositValue: BigNumber;
  publicKey: string;
  targetAddress: string;
  expiresAfter: string;
}

export interface SendDepositTokenTransactionForUserParams {
  tokenAddress: Web3Address;
  depositValue: BigNumber;
  targetAddress: string;
}

export interface DepositAnkrForUserParams {
  depositValue: BigNumber;
  publicKey: string;
  targetAddress: string;
  expiresAfter?: string;
}

export interface DepositTokenForUserParams {
  depositValue: BigNumber;
  targetAddress: string;
  tokenAddress: Web3Address;
  network: EBlockchain;
  tokenDecimals: number;
  depositContractAddress: Web3Address;
}
