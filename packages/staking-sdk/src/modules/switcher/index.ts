/* istanbul ignore file */
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from 'provider';

import { IFetchTxData, IShareArgs } from './types';

/**
 * You need to implement this interface if you want to integrate new tokens into Ankr Switch.
 *
 * @interface
 */
export interface ISwitcher {
  /**
   * Get -b token balance.
   *
   * @note A -b token is a reward-earning Ankr Liquid Staking token, such as [aETHb](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICb. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getABBalance(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get -c token balance.
   *
   * @note A -c token is a reward-bearing Ankr Liquid Staking token, such as [aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getACBalance(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get -c token ratio.
   *
   * @note A -c token is a reward-bearing Ankr Liquid Staking token, such as [aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getACRatio(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get -c token allowance.
   *
   * @note A -c token is a reward-bearing Ankr Liquid Staking token, such as [aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @note Allowance is the amount which _spender is still allowed to withdraw from _owner.
   * @param {string} [spender] - If `undefined` uses bond token address as a spender.
   * @returns {Promise<BigNumber>} - returns value in wei
   */
  getACAllowance(spender?: string): Promise<BigNumber>;
  /**
   * Fetch transaction data.
   *
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IFetchTxData>}
   */
  fetchTxData(txHash: string): Promise<IFetchTxData>;
  /**
   * Fetch transaction receipt.
   *
   * @param {string} txHash - transaction hash.
   * @returns {Promise<TransactionReceipt | null>}
   */
  fetchTxReceipt(txHash: string): Promise<TransactionReceipt | null>;
  /**
   * Approve -c token for -b token, i.e. allow -b token smart contract to access and transfer -c tokens.
   *
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as [aETHb or aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} [amount] - amount to approved.
   * @param {BigNumber.Value} [scale] - scale factor for amount.
   * @returns {Promise<IWeb3SendResult | undefined>}
   */
  approveACForAB(
    amount?: BigNumber,
    scale?: BigNumber.Value,
  ): Promise<IWeb3SendResult | undefined>;
  /**
   * Switch -c token to -b token, such as switch aBNBc to aBNBb.
   *
   * @note This function is used, e.g., when switching -c tokens for -b tokens.
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as [aETHb or aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} data - lock shares args.
   * @returns {Promise<IWeb3SendResult>}
   */
  lockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  /**
   * Switch -b token to -c token, such as switch aBNBb to aBNBc.
   *
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as [aETHb or aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {IShareArgs} data - lock shares args.
   * @returns {Promise<IWeb3SendResult>}
   */
  unlockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  /**
   * Add token to wallet.
   *
   * @param {string} token - token symbol.
   * @returns {Promise<boolean>}
   */
  addTokenToWallet(token: string): Promise<boolean>;
}

export * from './types';
