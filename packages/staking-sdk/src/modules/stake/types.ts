import BigNumber from 'bignumber.js';
import { Contract, EventData, Filter } from 'web3-eth-contract';

import { Web3KeyReadProvider } from '@ankr.com/provider';

/**
 * Internal raw data for history events
 */
export interface IEventsBatch {
  stakeRawEvents: EventData[];
  unstakeRawEvents: EventData[];
  rebasingEvents: EventData[];
  ratio: BigNumber;
}

/**
 * Event data with block timestamp
 */
export interface ITxHistoryEventData extends EventData {
  timestamp: number;
}

/**
 * Internal params for getting past events
 */
export interface IGetPastEvents<Provider = Web3KeyReadProvider> {
  provider: Provider;
  contract: Contract;
  eventName: string;
  startBlock: number;
  latestBlockNumber: number;
  rangeStep: number;
  filter?: Filter;
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
  unstakeBond: ITxEventsHistoryGroupItem[];
  unstakeCertificate: ITxEventsHistoryGroupItem[];
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

/**
 * Stake transaction data
 */
export interface IStakeData {
  txHash: string;
}

/**
 * Unstake transaction data
 */
export interface IUnstakeData {
  txHash: string;
}

/**
 * Claim history data for partner
 */
export interface IPartnerClaimHistoryData {
  date: Date;
  amount: BigNumber;
}
