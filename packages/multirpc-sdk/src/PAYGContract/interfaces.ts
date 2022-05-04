import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';
import { PrefixedHex, Web3Address } from '../common';

export interface IPAYGContractManager {
  depositAnkr(
    amount: BigNumber,
    publicKey: string,
    expiresAfter?: string,
  ): Promise<IWeb3SendResult>;

  getAllowance(amount: BigNumber): Promise<IWeb3SendResult>;

  hasEnoughAllowance(amount: BigNumber): Promise<boolean>;

  getLatestUserEventLogHash(user: Web3Address): Promise<PrefixedHex | false>;

  decryptMessageUsingPrivateKey(compatibleJsonData: string): Promise<string>;
}
