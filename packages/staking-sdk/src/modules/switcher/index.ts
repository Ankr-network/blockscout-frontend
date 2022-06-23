/* istanbul ignore file */
import BigNumber from 'bignumber.js';
import { TransactionReceipt } from 'web3-core';

import { IWeb3SendResult } from 'provider';

import { IFetchTxData, IShareArgs } from './types';

/**
 * You need to implement this interface if you'd like to integrate tokens into ankr switcher.
 *
 * @interface
 */
export interface ISwitcher {
  /**
   * Get bond token balance
   *
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getABBalance(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get certificate token balance
   *
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getACBalance(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get certificate ratio
   *
   * @param {boolean} [isFormatted] - If `false` returns value in wei.
   * @returns {Promise<BigNumber>}
   */
  getACRatio(isFormatted?: boolean): Promise<BigNumber>;
  /**
   * Get certificate allowance
   *
   * @param {string} [spender] - If `undefined` uses bond token address as a spender.
   * @returns {Promise<BigNumber>} - returns value in wei
   */
  getACAllowance(spender?: string): Promise<BigNumber>;
  /**
   * Fetch transaction data
   *
   * @typedef {Object} IFetchTxData
   * @property {BigNumber} [amount] - transaction amount or value
   * @property {boolean} isPending - is transaction still in pending state
   * @property {string} [destinationAddress] - transaction destination address
   *
   * @param {string} txHash - transaction hash.
   * @returns {Promise<IFetchTxData>}
   */
  fetchTxData(txHash: string): Promise<IFetchTxData>;
  /**
   * Fetch transaction receipt
   *
   * @param {string} txHash - transaction hash.
   * @returns {Promise<TransactionReceipt | null>}
   */
  fetchTxReceipt(txHash: string): Promise<TransactionReceipt | null>;
  /**
   * Approve certificate token for bond
   *
   * @param {BigNumber} [amount] - amount to approved.
   * @param {BigNumber.Value} [scale] - scale factor for amount.
   * @returns {Promise<IWeb3SendResult | undefined>}
   */
  approveACForAB(
    amount?: BigNumber,
    scale?: BigNumber.Value,
  ): Promise<IWeb3SendResult | undefined>;
  /**
   * Lock shares
   *
   * @typedef {Object} IShareArgs
   * @property {BigNumber} amount - transaction amount
   *
   * @param {IShareArgs} data - lock shares args.
   * @returns {Promise<IWeb3SendResult>}
   */
  lockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  /**
   * Unlock shares
   *
   * @typedef {Object} IShareArgs
   * @property {BigNumber} amount - transaction amount
   *
   * @param {IShareArgs} data - lock shares args.
   * @returns {Promise<IWeb3SendResult>}
   */
  unlockShares(data: IShareArgs): Promise<IWeb3SendResult>;
  /**
   * Add token to wallet
   *
   * @param {string} token - token symbol.
   * @returns {Promise<boolean>}
   */
  addTokenToWallet(token: string): Promise<boolean>;
}

export * from './types';
