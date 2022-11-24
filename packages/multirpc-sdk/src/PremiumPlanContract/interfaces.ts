import { IWeb3SendResult } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { PrefixedHex, Web3Address } from '../common';
import { IDepositAnkrToWalletResult } from './types';

export interface IPremiumPlanContractManager {
  allowTokensForAnkrDeposit(
    amount: BigNumber,
  ): Promise<IWeb3SendResult | false>;

  checkUserHaveEnoughAllowance(amount: BigNumber): Promise<boolean>;

  depositAnkrToWallet(
    amount: BigNumber,
    expiresAfter?: string,
  ): Promise<IDepositAnkrToWalletResult>;

  faucetAnkrTokensForTest(): Promise<void>;

  getAnkrBalance(user: Web3Address): Promise<BigNumber>;

  getCurrentAnkrBalance(): Promise<BigNumber>;

  getLatestUserEventLogHash(user: Web3Address): Promise<PrefixedHex | false>;
}
