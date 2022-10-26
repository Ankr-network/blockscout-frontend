import { tHTML } from 'common';
import { IRPCCallsConfig } from 'domains/requestComposer/types/harmony';
import { harmonyJSConfig } from './harmonyJSConfig';

const intlRoot = `chain-item.request-composer.method-description.harmony`;

export const HARMONY_CALL_CONFIG: IRPCCallsConfig = {
  hmyv2_call: {
    description: tHTML(`${intlRoot}.hmyv2_call`),
    harmony: harmonyJSConfig.hmyv2_call,
  },
  hmyv2_estimateGas: {
    description: tHTML(`${intlRoot}.hmyv2_estimateGas`),
    harmony: harmonyJSConfig.hmyv2_estimateGas,
  },
  hmyv2_getCode: {
    description: tHTML(`${intlRoot}.hmyv2_getCode`),
    harmony: harmonyJSConfig.hmyv2_getCode,
  },
  hmyv2_getStorageAt: {
    description: tHTML(`${intlRoot}.hmyv2_getStorageAt`),
    harmony: harmonyJSConfig.hmyv2_getStorageAt,
  },
  hmyv2_getDelegationsByDelegator: {
    description: tHTML(`${intlRoot}.hmyv2_getDelegationsByDelegator`),
    harmony: harmonyJSConfig.hmyv2_getDelegationsByDelegator,
  },
  hmyv2_getDelegationsByValidator: {
    description: tHTML(`${intlRoot}.hmyv2_getDelegationsByValidator`),
    harmony: harmonyJSConfig.hmyv2_getDelegationsByValidator,
  },
  hmyv2_getAllValidatorAddresses: {
    description: tHTML(`${intlRoot}.hmyv2_getAllValidatorAddresses`),
    harmony: harmonyJSConfig.hmyv2_getAllValidatorAddresses,
  },
  hmyv2_getAllValidatorInformation: {
    description: tHTML(`${intlRoot}.hmyv2_getAllValidatorInformation`),
    harmony: harmonyJSConfig.hmyv2_getAllValidatorInformation,
  },
  hmyv2_getAllValidatorInformationByBlockNumber: {
    description: tHTML(
      `${intlRoot}.hmyv2_getAllValidatorInformationByBlockNumber`,
    ),
    harmony: harmonyJSConfig.hmyv2_getAllValidatorInformationByBlockNumber,
  },
  hmyv2_getElectedValidatorAddresses: {
    description: tHTML(`${intlRoot}.hmyv2_getElectedValidatorAddresses`),
    harmony: harmonyJSConfig.hmyv2_getElectedValidatorAddresses,
  },
  hmyv2_getValidatorInformation: {
    description: tHTML(`${intlRoot}.hmyv2_getValidatorInformation`),
    harmony: harmonyJSConfig.hmyv2_getValidatorInformation,
  },
  hmyv2_getCurrentUtilityMetrics: {
    description: tHTML(`${intlRoot}.hmyv2_getCurrentUtilityMetrics`),
    harmony: harmonyJSConfig.hmyv2_getCurrentUtilityMetrics,
  },
  hmyv2_getMedianRawStakeSnapshot: {
    description: tHTML(`${intlRoot}.hmyv2_getMedianRawStakeSnapshot`),
    harmony: harmonyJSConfig.hmyv2_getMedianRawStakeSnapshot,
  },
  hmyv2_getStakingNetworkInfo: {
    description: tHTML(`${intlRoot}.hmyv2_getStakingNetworkInfo`),
    harmony: harmonyJSConfig.hmyv2_getStakingNetworkInfo,
  },
  hmyv2_getSuperCommittees: {
    description: tHTML(`${intlRoot}.hmyv2_getSuperCommittees`),
    harmony: harmonyJSConfig.hmyv2_getSuperCommittees,
    disabled: true,
  },
  hmyv2_getCXReceiptByHash: {
    description: tHTML(`${intlRoot}.hmyv2_getCXReceiptByHash`),
    harmony: harmonyJSConfig.hmyv2_getCXReceiptByHash,
  },
  hmyv2_getPendingCXReceipts: {
    description: tHTML(`${intlRoot}.hmyv2_getPendingCXReceipts`),
    harmony: harmonyJSConfig.hmyv2_getPendingCXReceipts,
  },
  hmyv2_getPoolStats: {
    description: tHTML(`${intlRoot}.hmyv2_getPoolStats`),
    harmony: harmonyJSConfig.hmyv2_getPoolStats,
    disabled: true,
  },
  hmyv2_pendingStakingTransactions: {
    description: tHTML(`${intlRoot}.hmyv2_pendingStakingTransactions`),
    harmony: harmonyJSConfig.hmyv2_pendingStakingTransactions,
    disabled: true,
  },
  hmyv2_pendingTransactions: {
    description: tHTML(`${intlRoot}.hmyv2_pendingTransactions`),
    harmony: harmonyJSConfig.hmyv2_pendingTransactions,
  },
  hmyv2_getCurrentStakingErrorSink: {
    description: tHTML(`${intlRoot}.hmyv2_getCurrentStakingErrorSink`),
    harmony: harmonyJSConfig.hmyv2_getCurrentStakingErrorSink,
  },
  hmyv2_getStakingTransactionByBlockNumberAndIndex: {
    description: tHTML(
      `${intlRoot}.hmyv2_getStakingTransactionByBlockNumberAndIndex`,
    ),
    harmony: harmonyJSConfig.hmyv2_getStakingTransactionByBlockNumberAndIndex,
  },
  hmyv2_getStakingTransactionByBlockHashAndIndex: {
    description: tHTML(
      `${intlRoot}.hmyv2_getStakingTransactionByBlockHashAndIndex`,
    ),
    harmony: harmonyJSConfig.hmyv2_getStakingTransactionByBlockHashAndIndex,
  },
  hmyv2_getStakingTransactionByHash: {
    description: tHTML(`${intlRoot}.hmyv2_getStakingTransactionByHash`),
    harmony: harmonyJSConfig.hmyv2_getStakingTransactionByHash,
  },
  hmyv2_sendRawStakingTransaction: {
    description: tHTML(`${intlRoot}.hmyv2_sendRawStakingTransaction`),
    harmony: harmonyJSConfig.hmyv2_sendRawStakingTransaction,
  },
  hmyv2_getCurrentTransactionErrorSink: {
    description: tHTML(`${intlRoot}.hmyv2_getCurrentTransactionErrorSink`),
    harmony: harmonyJSConfig.hmyv2_getCurrentTransactionErrorSink,
  },
  hmyv2_getTransactionByBlockHashAndIndex: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionByBlockHashAndIndex`),
    harmony: harmonyJSConfig.hmyv2_getTransactionByBlockHashAndIndex,
  },
  hmyv2_getTransactionByBlockNumberAndIndex: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionByBlockNumberAndIndex`),
    harmony: harmonyJSConfig.hmyv2_getTransactionByBlockNumberAndIndex,
  },
  hmyv2_getTransactionByHash: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionByHash`),
    harmony: harmonyJSConfig.hmyv2_getTransactionByHash,
  },
  hmyv2_getTransactionReceipt: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionReceipt`),
    harmony: harmonyJSConfig.hmyv2_getTransactionReceipt,
  },
  hmyv2_sendRawTransaction: {
    description: tHTML(`${intlRoot}.hmyv2_sendRawTransaction`),
    harmony: harmonyJSConfig.hmyv2_sendRawTransaction,
  },
  hmyv2_blockNumber: {
    description: tHTML(`${intlRoot}.hmyv2_blockNumber`),
    harmony: harmonyJSConfig.hmyv2_blockNumber,
  },
  hmyv2_getCirculatingSupply: {
    description: tHTML(`${intlRoot}.hmyv2_getCirculatingSupply`),
    harmony: harmonyJSConfig.hmyv2_getCirculatingSupply,
  },
  hmyv2_getEpoch: {
    description: tHTML(`${intlRoot}.hmyv2_getEpoch`),
    harmony: harmonyJSConfig.hmyv2_getEpoch,
  },
  hmyv2_getLastCrossLinks: {
    description: tHTML(`${intlRoot}.hmyv2_getLastCrossLinks`),
    harmony: harmonyJSConfig.hmyv2_getLastCrossLinks,
    disabled: true,
  },
  hmyv2_getLeader: {
    description: tHTML(`${intlRoot}.hmyv2_getLeader`),
    harmony: harmonyJSConfig.hmyv2_getLeader,
  },
  hmyv2_gasPrice: {
    description: tHTML(`${intlRoot}.hmyv2_gasPrice`),
    harmony: harmonyJSConfig.hmyv2_gasPrice,
  },
  hmyv2_getShardingStructure: {
    description: tHTML(`${intlRoot}.hmyv2_getShardingStructure`),
    harmony: harmonyJSConfig.hmyv2_getShardingStructure,
  },
  hmyv2_getTotalSupply: {
    description: tHTML(`${intlRoot}.hmyv2_getTotalSupply`),
    harmony: harmonyJSConfig.hmyv2_getTotalSupply,
  },
  hmyv2_getValidators: {
    description: tHTML(`${intlRoot}.hmyv2_getValidators`),
    harmony: harmonyJSConfig.hmyv2_getValidators,
  },
  hmyv2_getValidatorKeys: {
    description: tHTML(`${intlRoot}.hmyv2_getValidatorKeys`),
    harmony: harmonyJSConfig.hmyv2_getValidatorKeys,
    disabled: true,
  },
  hmyv2_protocolVersion: {
    description: tHTML(`${intlRoot}.hmyv2_protocolVersion`),
    harmony: harmonyJSConfig.hmyv2_protocolVersion,
  },
  hmyv2_getBlocks: {
    description: tHTML(`${intlRoot}.hmyv2_getBlocks`),
    harmony: harmonyJSConfig.hmyv2_getBlocks,
  },
  hmyv2_getBlockByNumber: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockByNumber`),
    harmony: harmonyJSConfig.hmyv2_getBlockByNumber,
  },
  hmyv2_getBlockByHash: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockByHash`),
    harmony: harmonyJSConfig.hmyv2_getBlockByHash,
  },
  hmyv2_getBlockSigners: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockSigners`),
    harmony: harmonyJSConfig.hmyv2_getBlockSigners,
  },
  hmyv2_getBlockSignersKeys: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockSignersKeys`),
    harmony: harmonyJSConfig.hmyv2_getBlockSignersKeys,
    disabled: true,
  },
  hmyv2_getBlockTransactionCountByNumber: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockTransactionCountByNumber`),
    harmony: harmonyJSConfig.hmyv2_getBlockTransactionCountByNumber,
  },
  hmyv2_getBlockTransactionCountByHash: {
    description: tHTML(`${intlRoot}.hmyv2_getBlockTransactionCountByHash`),
    harmony: harmonyJSConfig.hmyv2_getBlockTransactionCountByHash,
  },
  hmyv2_getHeaderByNumber: {
    description: tHTML(`${intlRoot}.hmyv2_getHeaderByNumber`),
    harmony: harmonyJSConfig.hmyv2_getHeaderByNumber,
  },
  hmyv2_getLatestChainHeaders: {
    description: tHTML(`${intlRoot}.hmyv2_getLatestChainHeaders`),
    harmony: harmonyJSConfig.hmyv2_getLatestChainHeaders,
  },
  hmyv2_latestHeader: {
    description: tHTML(`${intlRoot}.hmyv2_latestHeader`),
    harmony: harmonyJSConfig.hmyv2_latestHeader,
  },
  hmyv2_getBalance: {
    description: tHTML(`${intlRoot}.hmyv2_getBalance`),
    harmony: harmonyJSConfig.hmyv2_getBalance,
  },
  hmyv2_getBalanceByBlockNumber: {
    description: tHTML(`${intlRoot}.hmyv2_getBalanceByBlockNumber`),
    harmony: harmonyJSConfig.hmyv2_getBalanceByBlockNumber,
  },
  hmyv2_getStakingTransactionsCount: {
    description: tHTML(`${intlRoot}.hmyv2_getStakingTransactionsCount`),
    harmony: harmonyJSConfig.hmyv2_getStakingTransactionsCount,
  },
  hmyv2_getStakingTransactionsHistory: {
    description: tHTML(`${intlRoot}.hmyv2_getStakingTransactionsHistory`),
    harmony: harmonyJSConfig.hmyv2_getStakingTransactionsHistory,
  },
  hmyv2_getTransactionsCount: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionsCount`),
    harmony: harmonyJSConfig.hmyv2_getTransactionsCount,
  },
  hmyv2_getTransactionsHistory: {
    description: tHTML(`${intlRoot}.hmyv2_getTransactionsHistory`),
    harmony: harmonyJSConfig.hmyv2_getTransactionsHistory,
  },

  // api v1
  hmy_getBalanceByBlockNumber: {
    description: tHTML(`${intlRoot}.hmy_getBalanceByBlockNumber`),
    harmony: harmonyJSConfig.hmy_getBalanceByBlockNumber,
  },
  hmy_getTransactionCount: {
    description: tHTML(`${intlRoot}.hmy_getTransactionCount`),
    harmony: harmonyJSConfig.hmy_getTransactionCount,
  },
  hmy_getStakingTransactionByBlockHashAndIndex: {
    description: tHTML(
      `${intlRoot}.hmy_getStakingTransactionByBlockHashAndIndex`,
    ),
    harmony: harmonyJSConfig.hmy_getStakingTransactionByBlockHashAndIndex,
  },
  hmy_getStakingTransactionByBlockNumberAndIndex: {
    description: tHTML(
      `${intlRoot}.hmy_getStakingTransactionByBlockNumberAndIndex`,
    ),
    harmony: harmonyJSConfig.hmy_getStakingTransactionByBlockNumberAndIndex,
  },
  hmy_getStakingTransactionByHash: {
    description: tHTML(`${intlRoot}.hmy_getStakingTransactionByHash`),
    harmony: harmonyJSConfig.hmy_getStakingTransactionByHash,
  },
  hmy_getCurrentTransactionErrorSink: {
    description: tHTML(`${intlRoot}.hmy_getCurrentTransactionErrorSink`),
    harmony: harmonyJSConfig.hmy_getCurrentTransactionErrorSink,
  },
  hmy_getPendingCrossLinks: {
    description: tHTML(`${intlRoot}.hmy_getPendingCrossLinks`),
    harmony: harmonyJSConfig.hmy_getPendingCrossLinks,
  },
  hmy_getPendingCXReceipts: {
    description: tHTML(`${intlRoot}.hmy_getPendingCXReceipts`),
    harmony: harmonyJSConfig.hmy_getPendingCXReceipts,
  },
  hmy_getCXReceiptByHash: {
    description: tHTML(`${intlRoot}.hmy_getCXReceiptByHash`),
    harmony: harmonyJSConfig.hmy_getCXReceiptByHash,
  },
  hmy_pendingTransactions: {
    description: tHTML(`${intlRoot}.hmy_pendingTransactions`),
    harmony: harmonyJSConfig.hmy_pendingTransactions,
  },
  hmy_sendRawStakingTransaction: {
    description: tHTML(`${intlRoot}.hmy_sendRawStakingTransaction`),
    harmony: harmonyJSConfig.hmy_sendRawStakingTransaction,
  },
  hmy_getTransactionsHistory: {
    description: tHTML(`${intlRoot}.hmy_getTransactionsHistory`),
    harmony: harmonyJSConfig.hmy_getTransactionsHistory,
  },
  hmy_sendRawTransaction: {
    description: tHTML(`${intlRoot}.hmy_sendRawTransaction`),
    harmony: harmonyJSConfig.hmy_sendRawTransaction,
  },
  hmy_getTransactionReceipt: {
    description: tHTML(`${intlRoot}.hmy_getTransactionReceipt`),
    harmony: harmonyJSConfig.hmy_getTransactionReceipt,
  },
  hmy_getBlockTransactionCountByHash: {
    description: tHTML(`${intlRoot}.hmy_getBlockTransactionCountByHash`),
    harmony: harmonyJSConfig.hmy_getBlockTransactionCountByHash,
  },
  hmy_getBlockTransactionCountByNumber: {
    description: tHTML(`${intlRoot}.hmy_getBlockTransactionCountByNumber`),
    harmony: harmonyJSConfig.hmy_getBlockTransactionCountByNumber,
  },
  hmy_getTransactionByHash: {
    description: tHTML(`${intlRoot}.hmy_getTransactionByHash`),
    harmony: harmonyJSConfig.hmy_getTransactionByHash,
  },
  hmy_getTransactionByBlockNumberAndIndex: {
    description: tHTML(`${intlRoot}.hmy_getTransactionByBlockNumberAndIndex`),
    harmony: harmonyJSConfig.hmy_getTransactionByBlockNumberAndIndex,
  },
  hmy_getTransactionByBlockHashAndIndex: {
    description: tHTML(`${intlRoot}.hmy_getTransactionByBlockHashAndIndex`),
    harmony: harmonyJSConfig.hmy_getTransactionByBlockHashAndIndex,
  },
  hmy_getBlockByNumber: {
    description: tHTML(`${intlRoot}.hmy_getBlockByNumber`),
    harmony: harmonyJSConfig.hmy_getBlockByNumber,
  },
  hmy_getBlockByHash: {
    description: tHTML(`${intlRoot}.hmy_getBlockByHash`),
    harmony: harmonyJSConfig.hmy_getBlockByHash,
  },
  hmy_getBlocks: {
    description: tHTML(`${intlRoot}.hmy_getBlocks`),
    harmony: harmonyJSConfig.hmy_getBlocks,
  },
  hmy_estimateGas: {
    description: tHTML(`${intlRoot}.hmy_estimateGas`),
    harmony: harmonyJSConfig.hmy_estimateGas,
  },
  hmy_getStorageAt: {
    description: tHTML(`${intlRoot}.hmy_getStorageAt`),
    harmony: harmonyJSConfig.hmy_getStorageAt,
  },
  hmy_call: {
    description: tHTML(`${intlRoot}.hmy_call`),
    harmony: harmonyJSConfig.hmy_call,
  },
  hmy_getCode: {
    description: tHTML(`${intlRoot}.hmy_getCode`),
    harmony: harmonyJSConfig.hmy_getCode,
  },
  hmy_isLastBlock: {
    description: tHTML(`${intlRoot}.hmy_isLastBlock`),
    harmony: harmonyJSConfig.hmy_isLastBlock,
  },
  hmy_epochLastBlock: {
    description: tHTML(`${intlRoot}.hmy_epochLastBlock`),
    harmony: harmonyJSConfig.hmy_epochLastBlock,
  },
  hmy_latestHeader: {
    description: tHTML(`${intlRoot}.hmy_latestHeader`),
    harmony: harmonyJSConfig.hmy_latestHeader,
  },
  hmy_getShardingStructure: {
    description: tHTML(`${intlRoot}.hmy_getShardingStructure`),
    harmony: harmonyJSConfig.hmy_getShardingStructure,
  },
  hmy_blockNumber: {
    description: tHTML(`${intlRoot}.hmy_blockNumber`),
    harmony: harmonyJSConfig.hmy_blockNumber,
  },
  hmy_gasPrice: {
    description: tHTML(`${intlRoot}.hmy_gasPrice`),
    harmony: harmonyJSConfig.hmy_gasPrice,
  },
  hmy_getEpoch: {
    description: tHTML(`${intlRoot}.hmy_getEpoch`),
    harmony: harmonyJSConfig.hmy_getEpoch,
  },
  hmy_getLeader: {
    description: tHTML(`${intlRoot}.hmy_getLeader`),
    harmony: harmonyJSConfig.hmy_getLeader,
  },
  hmy_getCirculatingSupply: {
    description: tHTML(`${intlRoot}.hmy_getCirculatingSupply`),
    harmony: harmonyJSConfig.hmy_getCirculatingSupply,
  },
  hmy_getTotalSupply: {
    description: tHTML(`${intlRoot}.hmy_getTotalSupply`),
    harmony: harmonyJSConfig.hmy_getTotalSupply,
  },
  hmy_getStakingNetworkInfo: {
    description: tHTML(`${intlRoot}.hmy_getStakingNetworkInfo`),
    harmony: harmonyJSConfig.hmy_getStakingNetworkInfo,
  },
  hmy_getAllValidatorInformation: {
    description: tHTML(`${intlRoot}.hmy_getAllValidatorInformation`),
    harmony: harmonyJSConfig.hmy_getAllValidatorInformation,
  },
  hmy_getAllValidatorInformationByBlockNumber: {
    description: tHTML(
      `${intlRoot}.hmy_getAllValidatorInformationByBlockNumber`,
    ),
    harmony: harmonyJSConfig.hmy_getAllValidatorInformationByBlockNumber,
  },
  hmy_getCurrentUtilityMetrics: {
    description: tHTML(`${intlRoot}.hmy_getCurrentUtilityMetrics`),
    harmony: harmonyJSConfig.hmy_getCurrentUtilityMetrics,
  },
  hmy_getDelegationsByValidator: {
    description: tHTML(`${intlRoot}.hmy_getDelegationsByValidator`),
    harmony: harmonyJSConfig.hmy_getDelegationsByValidator,
  },
  hmy_getDelegationsByDelegatorAndValidator: {
    description: tHTML(`${intlRoot}.hmy_getDelegationsByDelegatorAndValidator`),
    harmony: harmonyJSConfig.hmy_getDelegationsByDelegatorAndValidator,
  },
  hmy_getDelegationsByDelegator: {
    description: tHTML(`${intlRoot}.hmy_getDelegationsByDelegator`),
    harmony: harmonyJSConfig.hmy_getDelegationsByDelegator,
  },
  hmy_getValidatorMetrics: {
    description: tHTML(`${intlRoot}.hmy_getValidatorMetrics`),
    harmony: harmonyJSConfig.hmy_getValidatorMetrics,
  },
  hmy_getMedianRawStakeSnapshot: {
    description: tHTML(`${intlRoot}.hmy_getMedianRawStakeSnapshot`),
    harmony: harmonyJSConfig.hmy_getMedianRawStakeSnapshot,
  },
  hmy_getActiveValidatorAddresses: {
    description: tHTML(`${intlRoot}.hmy_getActiveValidatorAddresses`),
    harmony: harmonyJSConfig.hmy_getActiveValidatorAddresses,
  },
  hmy_getAllValidatorAddresses: {
    description: tHTML(`${intlRoot}.hmy_getAllValidatorAddresses`),
    harmony: harmonyJSConfig.hmy_getAllValidatorAddresses,
  },
  hmy_getCurrentStakingErrorSink: {
    description: tHTML(`${intlRoot}.hmy_getCurrentStakingErrorSink`),
    harmony: harmonyJSConfig.hmy_getCurrentStakingErrorSink,
  },
  hmy_getValidatorInformation: {
    description: tHTML(`${intlRoot}.hmy_getValidatorInformation`),
    harmony: harmonyJSConfig.hmy_getValidatorInformation,
  },
  hmy_getValidators: {
    description: tHTML(`${intlRoot}.hmy_getValidators`),
    harmony: harmonyJSConfig.hmy_getValidators,
  },
  hmy_getSignedBlocks: {
    description: tHTML(`${intlRoot}.hmy_getSignedBlocks`),
    harmony: harmonyJSConfig.hmy_getSignedBlocks,
  },
  hmy_isBlockSigner: {
    description: tHTML(`${intlRoot}.hmy_isBlockSigner`),
    harmony: harmonyJSConfig.hmy_isBlockSigner,
  },
  hmy_getBlockSigners: {
    description: tHTML(`${intlRoot}.hmy_getBlockSigners`),
    harmony: harmonyJSConfig.hmy_getBlockSigners,
  },
};
