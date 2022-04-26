import BigNumber from 'bignumber.js';
import { IWeb3SendResult } from '@ankr.com/stakefi-web3';

export interface IPAYGContractManager {
  depositAnkr(
    amount: BigNumber,
    publicKey: string,
    expiresAfter?: string,
  ): Promise<IWeb3SendResult>;

  getAllowance(amount: BigNumber): Promise<IWeb3SendResult>;

  hasEnoughAllowance(amount: BigNumber): Promise<boolean>;
}
