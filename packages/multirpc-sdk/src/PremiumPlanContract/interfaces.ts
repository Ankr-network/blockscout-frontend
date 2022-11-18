import { IWeb3SendResult } from '@ankr.com/provider';
import BigNumber from 'bignumber.js';

import { Base64, PrefixedHex, Web3Address } from '../common';
import { IDepositAnkrToWalletResult } from './types';

export interface IPremiumPlanContractManager {
  allowTokensForAnkrDeposit(
    amount: BigNumber,
  ): Promise<IWeb3SendResult | false>;

  checkUserHaveEnoughAllowance(amount: BigNumber): Promise<boolean>;

  decryptMessageUsingPrivateKey(compatibleJsonData: string): Promise<string>;

  depositAnkrToWallet(
    amount: BigNumber,
    expiresAfter?: string,
  ): Promise<IDepositAnkrToWalletResult>;

  faucetAnkrTokensForTest(): Promise<void>;

  getAnkrBalance(user: Web3Address): Promise<BigNumber>;

  getCurrentAnkrBalance(): Promise<BigNumber>;

  getMetamaskEncryptionPublicKey(account: Web3Address): Promise<Base64>;

  getLatestUserEventLogHash(user: Web3Address): Promise<PrefixedHex | false>;
}
