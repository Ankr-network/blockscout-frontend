/* istanbul ignore file */
import { IWeb3SendResult } from '@ankr.com/provider-core';
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
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as [aETHb or aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive (-b or -c)
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<IStakeData>}
   */
  stake: (
    amount: BigNumber,
    token: string,
    scale?: number,
    referralCode?: string,
  ) => Promise<IStakeData>;
  /**
   * Unstake token.
   *
   * @note -b and -c tokens are Ankr Liquid Staking tokens, such as [aETHb or aETHc](https://www.ankr.com/docs/staking/liquid-staking/eth/overview/#two-types-of-eth2-liquid-staking) or aMATICc. <br />[Read more about Ankr LS token types](https://www.ankr.com/docs/staking/liquid-staking/overview#types-of-liquid-staking-tokens).
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to unstake (-b or -c)
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<IWeb3SendResult>}
   */
  unstake: (
    amount: BigNumber,
    token: string,
    scale?: number,
  ) => Promise<IWeb3SendResult>;
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
  /**
   * Get transaction history for block range.
   *
   * @param {number} from - from block
   * @param {number} to - to block
   * @returns {Promise<ITxEventsHistoryData>}
   */

  getTxEventsHistoryRange?: (
    from: number,
    to: number,
  ) => Promise<ITxEventsHistoryData>;
  /**
   * Get latest block number.
   *
   * @returns {Promise<number>}
   */
  getLatestBlock?: () => Promise<number>;
}

export * from './types';
export * from './getTxEventsHistoryGroup';
export * from './getFilteredContractEvents';
