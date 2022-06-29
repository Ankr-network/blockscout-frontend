/* istanbul ignore file */
import BigNumber from 'bignumber.js';

import { IPendingData, ITxEventsHistoryData, IStakeData } from './types';

/**
 * You need to implement this interface if you want to integrate new tokens into Ankr Staking.
 *
 * @interface
 */
export interface IStakable {
  /**
   * Stake token.
   *
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as <a href="https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking">aETHb or aETHc</a>. <br /><a href="https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens">Read more on Ankr LS token types</a>.
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (-b or -c)
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<IStakeData>}
   */
  stake: (
    amount: BigNumber,
    token: string,
    scale?: number,
  ) => Promise<IStakeData>;
  /**
   * Unstake token.
   *
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as <a href="https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking">aETHb or aETHc</a>. <br /><a href="https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens">Read more on Ankr LS token types</a>.
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (-b or -c)
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<void>}
   */
  unstake: (amount: BigNumber, token: string, scale?: number) => Promise<void>;
  /**
   * Get minimum stake amount.
   *
   * @returns {Promise<BigNumber>}
   */
  getMinimumStake: () => Promise<BigNumber>;
  /**
   * Get total pending unstake amount.
   *
   * @returns {Promise<BigNumber>}
   */
  getPendingClaim: () => Promise<BigNumber>;
  /**
   *
   * @returns {Promise<IPendingData>}
   */
  getPendingData: () => Promise<IPendingData>;
  /**
   * Get transaction history.
   *
   * @returns {Promise<ITxEventsHistoryData>}
   */
  getTxEventsHistory: () => Promise<ITxEventsHistoryData>;
}

export * from './types';
export * from './getTxEventsHistoryGroup';
