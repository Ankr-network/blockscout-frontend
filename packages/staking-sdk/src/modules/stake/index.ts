import BigNumber from 'bignumber.js';

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
   * @returns {Promise<{ txHash: string }>}
   */
  stake: (
    amount: BigNumber,
    token: string,
    scale?: number,
  ) => Promise<{ txHash: string }>;
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
   * @typedef {Object} IPendingData
   * @property {BigNumber} pendingBond - total unstake amount for bond token
   * @property {BigNumber} pendingCertificate - total unstake amount for certificate token
   * 
   * @returns {Promise<IPendingData>}
   */
  getPendingData: () => Promise<IPendingData>;
  /**
   * Get transaction history
   * 
   * @typedef {Object} ITxEventsHistoryGroupItem
   * @property {BigNumber} txAmount - transaction amount
   * @property {Date} txDate - transaction date
   * @property {string} txHash - transaction hash
   * @property {(string | null)} txType - transaction type (stake or unstake)
   * 
   * @typedef {Object} ITxEventsHistoryData
   * @property {ITxEventsHistoryGroupItem[]} completedBond - completed transactions for bond tokens
   * @property {ITxEventsHistoryGroupItem[]} completedCertificate - completed transaction for certificate tokens
   * @property {ITxEventsHistoryGroupItem[]} pendingBond - pending unstakes for bond tokens
   * @property {ITxEventsHistoryGroupItem[]} pendingCertificate - pending unstakes for certificate tokens
   * 
   * @returns {Promise<ITxEventsHistoryData>}
   */
  getTxEventsHistory: () => Promise<ITxEventsHistoryData>;
}

/**
 * Unstake pending data
 */
export interface IPendingData {
  pendingBond: BigNumber;
  pendingCertificate: BigNumber;
}

/**
 * Transaction history by token type and state
 */
export interface ITxEventsHistoryData {
  completedBond: ITxEventsHistoryGroupItem[];
  completedCertificate: ITxEventsHistoryGroupItem[];
  pendingBond: ITxEventsHistoryGroupItem[];
  pendingCertificate: ITxEventsHistoryGroupItem[];
}

/**
 * Transaction history data
 */
export interface ITxEventsHistoryGroupItem {
  txAmount: BigNumber;
  txDate: Date;
  txHash: string;
  txType: string | null;
}
