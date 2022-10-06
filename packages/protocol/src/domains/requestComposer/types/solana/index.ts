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
    exec: MethodsMap[key] extends string
      ? (
          provider: Connection,
          ...args: any[]
        ) => ReturnType<Connection[MethodsMap[key]]>
      : (provider: Connection, ...args: any[]) => any;
  };
};

type MethodsMap = {
  [SolanaMethod.getAccountInfo]: 'getAccountInfo';
  [SolanaMethod.getBalance]: 'getBalance';
  [SolanaMethod.getBlock]: 'getBlock';
  [SolanaMethod.getBlockCommitment]: undefined;
  [SolanaMethod.getBlockHeight]: 'getBlockHeight';
  [SolanaMethod.getBlockProduction]: 'getBlockProduction';
  [SolanaMethod.getBlocks]: 'getBlocks';
  [SolanaMethod.getBlocksWithLimit]: undefined;
  [SolanaMethod.getBlockTime]: 'getBlockTime';
  [SolanaMethod.getClusterNodes]: 'getClusterNodes';
  [SolanaMethod.getEpochInfo]: 'getEpochInfo';
  [SolanaMethod.getEpochSchedule]: 'getEpochSchedule';
  [SolanaMethod.getFeeForMessage]: 'getFeeForMessage';
  [SolanaMethod.getFirstAvailableBlock]: 'getFirstAvailableBlock';
  [SolanaMethod.getGenesisHash]: 'getGenesisHash';
  [SolanaMethod.getHealth]: undefined;
  [SolanaMethod.getHighestSnapshotSlot]: undefined;
  [SolanaMethod.getIdentity]: undefined;
  [SolanaMethod.getInflationGovernor]: 'getInflationGovernor';
  [SolanaMethod.getInflationRate]: undefined;
  [SolanaMethod.getInflationReward]: 'getInflationReward';
  [SolanaMethod.getLargestAccounts]: 'getLargestAccounts';
  [SolanaMethod.getLatestBlockhash]: 'getLatestBlockhash';
  [SolanaMethod.getLeaderSchedule]: 'getLeaderSchedule';
  [SolanaMethod.getMaxRetransmitSlot]: undefined;
  [SolanaMethod.getMaxShredInsertSlot]: undefined;
  [SolanaMethod.getMinimumBalanceForRentExemption]: 'getMinimumBalanceForRentExemption';
  [SolanaMethod.getMultipleAccounts]: undefined;
  [SolanaMethod.getProgramAccounts]: 'getProgramAccounts';
  [SolanaMethod.getRecentPerformanceSamples]: 'getRecentPerformanceSamples';
  [SolanaMethod.getSignaturesForAddress]: 'getSignaturesForAddress';
  [SolanaMethod.getSignatureStatuses]: 'getSignatureStatuses';
  [SolanaMethod.getSlot]: 'getSlot';
  [SolanaMethod.getSlotLeader]: 'getSlotLeader';
  [SolanaMethod.getSlotLeaders]: 'getSlotLeaders';
  [SolanaMethod.getStakeActivation]: 'getStakeActivation';
  [SolanaMethod.getStakeMinimumDelegation]: 'getStakeMinimumDelegation';
  [SolanaMethod.getSupply]: 'getSupply';
  [SolanaMethod.getTokenAccountBalance]: 'getTokenAccountBalance';
  [SolanaMethod.getTokenAccountsByDelegate]: undefined;
  [SolanaMethod.getTokenAccountsByOwner]: 'getTokenAccountsByOwner';
  [SolanaMethod.getTokenLargestAccounts]: 'getTokenLargestAccounts';
  [SolanaMethod.getTokenSupply]: 'getTokenSupply';
  [SolanaMethod.getTransaction]: 'getTransaction';
  [SolanaMethod.getTransactionCount]: 'getTransactionCount';
  [SolanaMethod.getVersion]: 'getVersion';
  [SolanaMethod.getVoteAccounts]: 'getVoteAccounts';
  [SolanaMethod.isBlockhashValid]: undefined;
  [SolanaMethod.minimumLedgerSlot]: undefined;
  [SolanaMethod.requestAirdrop]: 'requestAirdrop';
  [SolanaMethod.sendTransaction]: 'sendTransaction';
  [SolanaMethod.simulateTransaction]: 'simulateTransaction';
};

export type RPCCallsConfig = {
  [key in SolanaMethod]: {
    description: string;
    disabled?: boolean;
    [SolanaLibraryID.SolanaWeb3JS]: LibraryConfig[key];
  };
};

export type SolanaMethodResponse = unknown;
