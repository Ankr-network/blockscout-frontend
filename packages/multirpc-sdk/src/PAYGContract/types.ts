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
  expiresAfter: string;
  publicKey: string;
  targetAddress: string;
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

export interface IThrowErrorIfValueIsGreaterThanBalanceParams {
  amount: BigNumber;
  network: EBlockchain;
}

export interface IThrowErrorIfDepositIsGreaterThanAllowanceParams {
  depositValue: BigNumber;
  allowanceValue: BigNumber;
  tokenDecimals: number;
}