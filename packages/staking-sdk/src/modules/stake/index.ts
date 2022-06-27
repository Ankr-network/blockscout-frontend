/* istanbul ignore file */
import BigNumber from 'bignumber.js';

import { IPendingData, ITxEventsHistoryData, IStakeData } from './types';

/**
 * You need to implement this interface if you'd like to integrate tokens into ankr staking.
 *
 * @interface
 */
export interface IStakable {
  /**
   * Stake
   *
   * @param {BigNumber} amount - amount of token
   * @param {string} token - choose which token to receive
   * @param {number} [scale] - scale factor for amount
   * @returns {Promise<IStakeData>}
   */
  stake: (
    amount: BigNumber,
    token: string,
    scale?: number,
  ) => Promise<IStakeData>;
  /**
   * Unstake
   *
   * @param {BigNumber} amount - amount to unstake
   * @param {string} token - choose which token to receive
   * @param {number} [scale] - scale factor for amount;
   * @returns {Promise<void>}
   */
  unstake: (amount: BigNumber, token: string, scale?: number) => Promise<void>;
  /**
   * Get minimum stake amount
   *
   * @returns {Promise<BigNumber>}
   */
  getMinimumStake: () => Promise<BigNumber>;
  /**
   * Get total pending unstake amount
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
   * Get transaction history
   *
   * @returns {Promise<ITxEventsHistoryData>}
   */
  getTxEventsHistory: () => Promise<ITxEventsHistoryData>;
}

export * from './types';
