import BigNumber from 'bignumber.js';

import { PrefixedHex } from '../common';

export interface IPAYGContractManagerConfig {
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

export interface DepositAnkrForUserParams {
  depositValue: BigNumber;
  publicKey: string;
  targetAddress: string;
  expiresAfter?: string;
}
