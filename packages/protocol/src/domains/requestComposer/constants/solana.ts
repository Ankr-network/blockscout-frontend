import { Commitment, Finality, LargestAccountsFilter } from '@solana/web3.js';

export enum SolanaLibraryID {
  SolanaWeb3JS = '@solana/web3.js',
}

export enum SolanaMethod {
  getAccountInfo = 'getAccountInfo',
  getBalance = 'getBalance',
  getBlock = 'getBlock',
  getBlockCommitment = 'getBlockCommitment',
  getBlockHeight = 'getBlockHeight',
  getBlockProduction = 'getBlockProduction',
  getBlocks = 'getBlocks',
  getBlocksWithLimit = 'getBlocksWithLimit',
  getBlockTime = 'getBlockTime',
  getClusterNodes = 'getClusterNodes',
  getEpochInfo = 'getEpochInfo',
  getEpochSchedule = 'getEpochSchedule',
  getFeeForMessage = 'getFeeForMessage',
  getFirstAvailableBlock = 'getFirstAvailableBlock',
  getGenesisHash = 'getGenesisHash',
  getHealth = 'getHealth',
  getHighestSnapshotSlot = 'getHighestSnapshotSlot',
  getIdentity = 'getIdentity',
  getInflationGovernor = 'getInflationGovernor',
  getInflationRate = 'getInflationRate',
  getInflationReward = 'getInflationReward',
  getLargestAccounts = 'getLargestAccounts',
  getLatestBlockhash = 'getLatestBlockhash',
  getLeaderSchedule = 'getLeaderSchedule',
  getMaxRetransmitSlot = 'getMaxRetransmitSlot',
  getMaxShredInsertSlot = 'getMaxShredInsertSlot',
  getMinimumBalanceForRentExemption = 'getMinimumBalanceForRentExemption',
  getMultipleAccounts = 'getMultipleAccounts',
  getProgramAccounts = 'getProgramAccounts',
  getRecentPerformanceSamples = 'getRecentPerformanceSamples',
  getSignaturesForAddress = 'getSignaturesForAddress',
  getSignatureStatuses = 'getSignatureStatuses',
  getSlot = 'getSlot',
  getSlotLeader = 'getSlotLeader',
  getSlotLeaders = 'getSlotLeaders',
  getStakeActivation = 'getStakeActivation',
  getStakeMinimumDelegation = 'getStakeMinimumDelegation',
  getSupply = 'getSupply',
  getTokenAccountBalance = 'getTokenAccountBalance',
  getTokenAccountsByDelegate = 'getTokenAccountsByDelegate',
  getTokenAccountsByOwner = 'getTokenAccountsByOwner',
  getTokenLargestAccounts = 'getTokenLargestAccounts',
  getTokenSupply = 'getTokenSupply',
  getTransaction = 'getTransaction',
  getTransactionCount = 'getTransactionCount',
  getVersion = 'getVersion',
  getVoteAccounts = 'getVoteAccounts',
  isBlockhashValid = 'isBlockhashValid',
  minimumLedgerSlot = 'minimumLedgerSlot',
  requestAirdrop = 'requestAirdrop',
  sendTransaction = 'sendTransaction',
  simulateTransaction = 'simulateTransaction',
}

export const commitments: Commitment[] = [
  'processed',
  'confirmed',
  'finalized',
  'recent',
  'single',
  'singleGossip',
  'root',
  'max',
];

export const filters: LargestAccountsFilter[] = [
  'circulating',
  'nonCirculating',
];

export const finalities: Finality[] = ['confirmed', 'finalized'];
