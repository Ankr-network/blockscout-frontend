import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/provider';
import { EventData } from 'web3-eth-contract';

import { PrefixedHex, Web3Address } from '../common';

export interface IPAYGContractManager {
  depositAnkr(
    amount: BigNumber,
    publicKey: string,
    expiresAfter?: string,
  ): Promise<IWeb3SendResult>;

  getAllowance(amount: BigNumber): Promise<IWeb3SendResult>;

  hasEnoughAllowance(amount: BigNumber): Promise<boolean>;

  getLatestUserTierAssignedEventLogHash(
    user: Web3Address,
  ): Promise<PrefixedHex | false>;

  getLatestLockedFundsEvents(user: Web3Address): Promise<EventData[]>;

  getLatestProviderRequestEvents(user: Web3Address): Promise<EventData[]>;

  decryptMessageUsingPrivateKey(compatibleJsonData: string): Promise<string>;

  rejectAllowance(): Promise<IWeb3SendResult>;

  withdrawAnkr(amount: BigNumber): Promise<IWeb3SendResult>;

  getLatestAllowanceEvents(user: Web3Address): Promise<EventData[]>;

  getCurrentAccountBalance(): Promise<string>;
}
