import { Connection } from '@solana/web3.js';

import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';

export interface Arg {
  description: string;
  placeholder?: string;
  type: string;
  validate?: (value: string) => boolean;
}

export type LibraryConfig = {
  [key in SolanaMethod]: {
    args: Arg[];
    codeSample: (...args: any) => any;
    exec: (provider: Connection, ...args: any[]) => MethodResult[key];
  };
};

type MethodResult = {
  [SolanaMethod.getAccountInfo]: ReturnType<Connection['getAccountInfo']>;
  [SolanaMethod.getBalance]: ReturnType<Connection['getBalance']>;
  [SolanaMethod.getBlock]: ReturnType<Connection['getBlock']>;
  [SolanaMethod.getBlockCommitment]: Promise<void>;
  [SolanaMethod.getBlockHeight]: ReturnType<Connection['getBlockHeight']>;
  [SolanaMethod.getBlockProduction]: ReturnType<
    Connection['getBlockProduction']
  >;
  [SolanaMethod.getBlocks]: Promise<string>;
  [SolanaMethod.getBlocksWithLimit]: Promise<void>;
  [SolanaMethod.getBlockTime]: ReturnType<Connection['getBlockTime']>;
  [SolanaMethod.getClusterNodes]: Promise<string>;
  [SolanaMethod.getEpochInfo]: ReturnType<Connection['getEpochInfo']>;
  [SolanaMethod.getEpochSchedule]: ReturnType<Connection['getEpochSchedule']>;
  [SolanaMethod.getFeeForMessage]: ReturnType<Connection['getFeeForMessage']>;
  [SolanaMethod.getFirstAvailableBlock]: ReturnType<
    Connection['getFirstAvailableBlock']
  >;
  [SolanaMethod.getGenesisHash]: ReturnType<Connection['getGenesisHash']>;
  [SolanaMethod.getHealth]: Promise<void>;
  [SolanaMethod.getHighestSnapshotSlot]: Promise<void>;
  [SolanaMethod.getIdentity]: Promise<void>;
  [SolanaMethod.getInflationGovernor]: ReturnType<
    Connection['getInflationGovernor']
  >;
  [SolanaMethod.getInflationRate]: Promise<void>;
  [SolanaMethod.getInflationReward]: ReturnType<
    Connection['getInflationReward']
  >;
  [SolanaMethod.getLargestAccounts]: ReturnType<
    Connection['getLargestAccounts']
  >;
  [SolanaMethod.getLatestBlockhash]: ReturnType<
    Connection['getLatestBlockhash']
  >;
  [SolanaMethod.getLeaderSchedule]: Promise<string>;
  [SolanaMethod.getMaxRetransmitSlot]: Promise<void>;
  [SolanaMethod.getMaxShredInsertSlot]: Promise<void>;
  [SolanaMethod.getMinimumBalanceForRentExemption]: ReturnType<
    Connection['getMinimumBalanceForRentExemption']
  >;
  [SolanaMethod.getMultipleAccounts]: Promise<void>;
  [SolanaMethod.getProgramAccounts]: ReturnType<
    Connection['getProgramAccounts']
  >;
  [SolanaMethod.getRecentPerformanceSamples]: ReturnType<
    Connection['getRecentPerformanceSamples']
  >;
  [SolanaMethod.getSignaturesForAddress]: ReturnType<
    Connection['getSignaturesForAddress']
  >;
  [SolanaMethod.getSignatureStatuses]: ReturnType<
    Connection['getSignatureStatuses']
  >;
  [SolanaMethod.getSlot]: ReturnType<Connection['getSlot']>;
  [SolanaMethod.getSlotLeader]: ReturnType<Connection['getSlotLeader']>;
  [SolanaMethod.getSlotLeaders]: ReturnType<Connection['getSlotLeaders']>;
  [SolanaMethod.getStakeActivation]: ReturnType<
    Connection['getStakeActivation']
  >;
  [SolanaMethod.getStakeMinimumDelegation]: ReturnType<
    Connection['getStakeMinimumDelegation']
  >;
  [SolanaMethod.getSupply]: Promise<string>;
  [SolanaMethod.getTokenAccountBalance]: ReturnType<
    Connection['getTokenAccountBalance']
  >;
  [SolanaMethod.getTokenAccountsByDelegate]: Promise<void>;
  [SolanaMethod.getTokenAccountsByOwner]: ReturnType<
    Connection['getTokenAccountsByOwner']
  >;
  [SolanaMethod.getTokenLargestAccounts]: ReturnType<
    Connection['getTokenLargestAccounts']
  >;
  [SolanaMethod.getTokenSupply]: ReturnType<Connection['getTokenSupply']>;
  [SolanaMethod.getTransaction]: ReturnType<Connection['getTransaction']>;
  [SolanaMethod.getTransactionCount]: ReturnType<
    Connection['getTransactionCount']
  >;
  [SolanaMethod.getVersion]: ReturnType<Connection['getVersion']>;
  [SolanaMethod.getVoteAccounts]: Promise<string>;
  [SolanaMethod.isBlockhashValid]: Promise<void>;
  [SolanaMethod.minimumLedgerSlot]: Promise<void>;
  [SolanaMethod.requestAirdrop]: ReturnType<Connection['requestAirdrop']>;
  [SolanaMethod.sendTransaction]: ReturnType<Connection['sendTransaction']>;
  [SolanaMethod.simulateTransaction]: ReturnType<
    Connection['simulateTransaction']
  >;
};

export type RPCCallsConfig = {
  [key in SolanaMethod]: {
    description: string;
    disabled?: boolean;
    [SolanaLibraryID.SolanaWeb3JS]: LibraryConfig[key];
  };
};

export type SolanaMethodResponse = unknown;
