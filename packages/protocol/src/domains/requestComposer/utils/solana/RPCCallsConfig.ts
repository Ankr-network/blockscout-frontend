import {
  SolanaLibraryID,
  SolanaMethod,
} from 'domains/requestComposer/constants/solana';
import { RPCCallsConfig } from 'domains/requestComposer/types/solana';
import { t } from 'modules/i18n/utils/intl';
import { solanaWeb3Config } from './solanaWeb3Config';

const root = 'chain-item.request-composer.method-description.solana';

export const RPC_CALLS_CONFIG: RPCCallsConfig = {
  [SolanaMethod.getAccountInfo]: {
    description: t(`${root}.${SolanaMethod.getAccountInfo}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getAccountInfo],
  },
  [SolanaMethod.getBalance]: {
    description: t(`${root}.${SolanaMethod.getBalance}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getBalance],
  },
  [SolanaMethod.getBlock]: {
    description: t(`${root}.${SolanaMethod.getBlock}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getBlock],
  },
  [SolanaMethod.getBlockCommitment]: {
    description: t(`${root}.${SolanaMethod.getBlockCommitment}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getBlockCommitment],
  },
  [SolanaMethod.getBlockHeight]: {
    description: t(`${root}.${SolanaMethod.getBlockHeight}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getBlockHeight],
  },
  [SolanaMethod.getBlockProduction]: {
    description: t(`${root}.${SolanaMethod.getBlockProduction}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getBlockProduction],
  },
  [SolanaMethod.getBlocks]: {
    description: t(`${root}.${SolanaMethod.getBlocks}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getBlocks],
  },
  [SolanaMethod.getBlocksWithLimit]: {
    description: t(`${root}.${SolanaMethod.getBlocksWithLimit}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getBlocksWithLimit],
  },
  [SolanaMethod.getBlockTime]: {
    description: t(`${root}.${SolanaMethod.getBlockTime}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getBlockTime],
  },
  [SolanaMethod.getClusterNodes]: {
    description: t(`${root}.${SolanaMethod.getClusterNodes}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getClusterNodes],
  },
  [SolanaMethod.getEpochInfo]: {
    description: t(`${root}.${SolanaMethod.getEpochInfo}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getEpochInfo],
  },
  [SolanaMethod.getEpochSchedule]: {
    description: t(`${root}.${SolanaMethod.getEpochSchedule}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getEpochSchedule],
  },
  [SolanaMethod.getFeeForMessage]: {
    description: t(`${root}.${SolanaMethod.getFeeForMessage}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getFeeForMessage],
  },
  [SolanaMethod.getFirstAvailableBlock]: {
    description: t(`${root}.${SolanaMethod.getFirstAvailableBlock}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getFirstAvailableBlock],
  },
  [SolanaMethod.getGenesisHash]: {
    description: t(`${root}.${SolanaMethod.getGenesisHash}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getGenesisHash],
  },
  [SolanaMethod.getHealth]: {
    description: t(`${root}.${SolanaMethod.getHealth}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getHealth],
  },
  [SolanaMethod.getHighestSnapshotSlot]: {
    description: t(`${root}.${SolanaMethod.getHighestSnapshotSlot}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getHighestSnapshotSlot],
  },
  [SolanaMethod.getIdentity]: {
    description: t(`${root}.${SolanaMethod.getIdentity}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getIdentity],
  },
  [SolanaMethod.getInflationGovernor]: {
    description: t(`${root}.${SolanaMethod.getInflationGovernor}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getInflationGovernor],
  },
  [SolanaMethod.getInflationRate]: {
    description: t(`${root}.${SolanaMethod.getInflationRate}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getInflationRate],
  },
  [SolanaMethod.getInflationReward]: {
    description: t(`${root}.${SolanaMethod.getInflationReward}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getInflationReward],
  },
  [SolanaMethod.getLargestAccounts]: {
    description: t(`${root}.${SolanaMethod.getLargestAccounts}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getLargestAccounts],
  },
  [SolanaMethod.getLatestBlockhash]: {
    description: t(`${root}.${SolanaMethod.getLatestBlockhash}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getLatestBlockhash],
  },
  [SolanaMethod.getLeaderSchedule]: {
    description: t(`${root}.${SolanaMethod.getLeaderSchedule}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getLeaderSchedule],
  },
  [SolanaMethod.getMaxRetransmitSlot]: {
    description: t(`${root}.${SolanaMethod.getMaxRetransmitSlot}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getMaxRetransmitSlot],
  },
  [SolanaMethod.getMaxShredInsertSlot]: {
    description: t(`${root}.${SolanaMethod.getMaxShredInsertSlot}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getMaxShredInsertSlot],
  },
  [SolanaMethod.getMinimumBalanceForRentExemption]: {
    description: t(`${root}.${SolanaMethod.getMinimumBalanceForRentExemption}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getMinimumBalanceForRentExemption],
  },
  [SolanaMethod.getMultipleAccounts]: {
    description: t(`${root}.${SolanaMethod.getMultipleAccounts}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getMultipleAccounts],
  },
  [SolanaMethod.getProgramAccounts]: {
    description: t(`${root}.${SolanaMethod.getProgramAccounts}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getProgramAccounts],
  },
  [SolanaMethod.getRecentPerformanceSamples]: {
    description: t(`${root}.${SolanaMethod.getRecentPerformanceSamples}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getRecentPerformanceSamples],
  },
  [SolanaMethod.getSignaturesForAddress]: {
    description: t(`${root}.${SolanaMethod.getSignaturesForAddress}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getSignaturesForAddress],
  },
  [SolanaMethod.getSignatureStatuses]: {
    description: t(`${root}.${SolanaMethod.getSignatureStatuses}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getSignatureStatuses],
  },
  [SolanaMethod.getSlot]: {
    description: t(`${root}.${SolanaMethod.getSlot}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getSlot],
  },
  [SolanaMethod.getSlotLeader]: {
    description: t(`${root}.${SolanaMethod.getSlotLeader}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getSlotLeader],
  },
  [SolanaMethod.getSlotLeaders]: {
    description: t(`${root}.${SolanaMethod.getSlotLeaders}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getSlotLeaders],
  },
  [SolanaMethod.getStakeActivation]: {
    description: t(`${root}.${SolanaMethod.getStakeActivation}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getStakeActivation],
  },
  [SolanaMethod.getStakeMinimumDelegation]: {
    description: t(`${root}.${SolanaMethod.getStakeMinimumDelegation}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getStakeMinimumDelegation],
  },
  [SolanaMethod.getSupply]: {
    description: t(`${root}.${SolanaMethod.getSupply}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getSupply],
  },
  [SolanaMethod.getTokenAccountBalance]: {
    description: t(`${root}.${SolanaMethod.getTokenAccountBalance}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTokenAccountBalance],
  },
  [SolanaMethod.getTokenAccountsByDelegate]: {
    description: t(`${root}.${SolanaMethod.getTokenAccountsByDelegate}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTokenAccountsByDelegate],
  },
  [SolanaMethod.getTokenAccountsByOwner]: {
    description: t(`${root}.${SolanaMethod.getTokenAccountsByOwner}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTokenAccountsByOwner],
  },
  [SolanaMethod.getTokenLargestAccounts]: {
    description: t(`${root}.${SolanaMethod.getTokenLargestAccounts}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTokenLargestAccounts],
  },
  [SolanaMethod.getTokenSupply]: {
    description: t(`${root}.${SolanaMethod.getTokenSupply}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTokenSupply],
  },
  [SolanaMethod.getTransaction]: {
    description: t(`${root}.${SolanaMethod.getTransaction}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTransaction],
  },
  [SolanaMethod.getTransactionCount]: {
    description: t(`${root}.${SolanaMethod.getTransactionCount}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getTransactionCount],
  },
  [SolanaMethod.getVersion]: {
    description: t(`${root}.${SolanaMethod.getVersion}`),
    [SolanaLibraryID.SolanaWeb3JS]: solanaWeb3Config[SolanaMethod.getVersion],
  },
  [SolanaMethod.getVoteAccounts]: {
    description: t(`${root}.${SolanaMethod.getVoteAccounts}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.getVoteAccounts],
  },
  [SolanaMethod.isBlockhashValid]: {
    description: t(`${root}.${SolanaMethod.isBlockhashValid}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.isBlockhashValid],
  },
  [SolanaMethod.minimumLedgerSlot]: {
    description: t(`${root}.${SolanaMethod.minimumLedgerSlot}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.minimumLedgerSlot],
  },
  [SolanaMethod.requestAirdrop]: {
    description: t(`${root}.${SolanaMethod.requestAirdrop}`),
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.requestAirdrop],
  },
  [SolanaMethod.sendTransaction]: {
    description: t(`${root}.${SolanaMethod.sendTransaction}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.sendTransaction],
  },
  [SolanaMethod.simulateTransaction]: {
    description: t(`${root}.${SolanaMethod.simulateTransaction}`),
    disabled: true,
    [SolanaLibraryID.SolanaWeb3JS]:
      solanaWeb3Config[SolanaMethod.simulateTransaction],
  },
};
