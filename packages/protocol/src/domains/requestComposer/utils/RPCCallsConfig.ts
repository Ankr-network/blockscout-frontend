import { t } from 'common';
import { IRPCCallsConfig } from '../types';
import { ethersJSConfig } from './ethersJSConfig';
import { web3JSConfig } from './web3JSConfig';

const root = 'chain-item.request-composer.method-description';

export const RPC_CALLS_CONFIG: IRPCCallsConfig = {
  web3_clientVersion: {
    description: t(`${root}.web3_clientVersion`),
    web3: web3JSConfig.web3_clientVersion,
    ethers: ethersJSConfig.web3_clientVersion,
  },
  web3_sha3: {
    description: t(`${root}.web3_sha3`),
    web3: web3JSConfig.web3_sha3,
    ethers: ethersJSConfig.web3_sha3,
  },
  net_version: {
    description: t(`${root}.net_version`),
    web3: web3JSConfig.net_version,
    ethers: ethersJSConfig.net_version,
  },
  net_listening: {
    description: t(`${root}.net_listening`),
    web3: web3JSConfig.net_listening,
    ethers: ethersJSConfig.net_listening,
  },
  net_peerCount: {
    description: t(`${root}.net_peerCount`),
    web3: web3JSConfig.net_peerCount,
    ethers: ethersJSConfig.net_peerCount,
  },
  eth_protocolVersion: {
    description: t(`${root}.eth_protocolVersion`),
    web3: web3JSConfig.eth_protocolVersion,
    ethers: ethersJSConfig.eth_protocolVersion,
  },
  eth_syncing: {
    description: t(`${root}.eth_syncing`),
    web3: web3JSConfig.eth_syncing,
    ethers: ethersJSConfig.eth_syncing,
  },
  eth_coinbase: {
    description: t(`${root}.eth_coinbase`),
    web3: web3JSConfig.eth_coinbase,
    ethers: ethersJSConfig.eth_coinbase,
  },
  eth_mining: {
    description: t(`${root}.eth_mining`),
    web3: web3JSConfig.eth_mining,
    ethers: ethersJSConfig.eth_mining,
  },
  eth_hashrate: {
    description: t(`${root}.eth_hashrate`),
    web3: web3JSConfig.eth_hashrate,
    ethers: ethersJSConfig.eth_hashrate,
  },
  eth_gasPrice: {
    description: t(`${root}.eth_gasPrice`),
    web3: web3JSConfig.eth_gasPrice,
    ethers: ethersJSConfig.eth_gasPrice,
  },
  eth_accounts: {
    description: t(`${root}.eth_accounts`),
    web3: web3JSConfig.eth_accounts,
    ethers: ethersJSConfig.eth_accounts,
  },
  eth_blockNumber: {
    description: t(`${root}.eth_blockNumber`),
    web3: web3JSConfig.eth_blockNumber,
    ethers: ethersJSConfig.eth_blockNumber,
  },
  eth_getBalance: {
    description: t(`${root}.eth_getBalance`),
    web3: web3JSConfig.eth_getBalance,
    ethers: ethersJSConfig.eth_getBalance,
  },
  eth_getStorageAt: {
    description: t(`${root}.eth_getStorageAt`),
    web3: web3JSConfig.eth_getStorageAt,
    ethers: ethersJSConfig.eth_getStorageAt,
  },
  eth_getTransactionCount: {
    description: t(`${root}.eth_getTransactionCount`),
    web3: web3JSConfig.eth_getTransactionCount,
    ethers: ethersJSConfig.eth_getTransactionCount,
  },
  eth_getBlockTransactionCountByHash: {
    description: t(`${root}.eth_getBlockTransactionCountByHash`),
    web3: web3JSConfig.eth_getBlockTransactionCountByHash,
    ethers: ethersJSConfig.eth_getBlockTransactionCountByHash,
  },
  eth_getBlockTransactionCountByNumber: {
    description: t(`${root}.eth_getBlockTransactionCountByNumber`),
    web3: web3JSConfig.eth_getBlockTransactionCountByNumber,
    ethers: ethersJSConfig.eth_getBlockTransactionCountByNumber,
  },
  eth_getUncleCountByBlockHash: {
    description: t(`${root}.eth_getUncleCountByBlockHash`),
    web3: web3JSConfig.eth_getUncleCountByBlockHash,
    ethers: ethersJSConfig.eth_getUncleCountByBlockHash,
  },
  eth_getUncleCountByBlockNumber: {
    description: t(`${root}.eth_getUncleCountByBlockNumber`),
    web3: web3JSConfig.eth_getUncleCountByBlockNumber,
    ethers: ethersJSConfig.eth_getUncleCountByBlockNumber,
  },
  eth_getCode: {
    description: t(`${root}.eth_getCode`),
    web3: web3JSConfig.eth_getCode,
    ethers: ethersJSConfig.eth_getCode,
  },
  eth_sign: {
    disabled: true,
    description: t(`${root}.eth_sign`),
    web3: web3JSConfig.eth_sign,
    ethers: ethersJSConfig.eth_sign,
  },
  eth_signTransaction: {
    disabled: true,
    description: t(`${root}.eth_signTransaction`),
    web3: web3JSConfig.eth_signTransaction,
    ethers: ethersJSConfig.eth_signTransaction,
  },
  eth_sendTransaction: {
    disabled: true,
    description: t(`${root}.eth_sendTransaction`),
    web3: web3JSConfig.eth_sendTransaction,
    ethers: ethersJSConfig.eth_sendTransaction,
  },
  eth_sendRawTransaction: {
    description: t(`${root}.eth_sendRawTransaction`),
    web3: web3JSConfig.eth_sendRawTransaction,
    ethers: ethersJSConfig.eth_sendRawTransaction,
  },
  eth_call: {
    description: t(`${root}.eth_call`),
    web3: web3JSConfig.eth_call,
    ethers: ethersJSConfig.eth_call,
  },
  eth_estimateGas: {
    disabled: true,
    description: t(`${root}.eth_estimateGas`),
    web3: web3JSConfig.eth_estimateGas,
    ethers: ethersJSConfig.eth_estimateGas,
  },
  eth_getBlockByHash: {
    description: t(`${root}.eth_getBlockByHash`),
    web3: web3JSConfig.eth_getBlockByHash,
    ethers: ethersJSConfig.eth_getBlockByHash,
  },
  eth_getBlockByNumber: {
    description: t(`${root}.eth_getBlockByNumber`),
    web3: web3JSConfig.eth_getBlockByNumber,
    ethers: ethersJSConfig.eth_getBlockByNumber,
  },
  eth_getTransactionByHash: {
    description: t(`${root}.eth_getTransactionByHash`),
    web3: web3JSConfig.eth_getTransactionByHash,
    ethers: ethersJSConfig.eth_getTransactionByHash,
  },
  eth_getTransactionByBlockHashAndIndex: {
    description: t(`${root}.eth_getTransactionByBlockHashAndIndex`),
    web3: web3JSConfig.eth_getTransactionByBlockHashAndIndex,
    ethers: ethersJSConfig.eth_getTransactionByBlockHashAndIndex,
  },
  eth_getTransactionByBlockNumberAndIndex: {
    description: t(`${root}.eth_getTransactionByBlockNumberAndIndex`),
    web3: web3JSConfig.eth_getTransactionByBlockNumberAndIndex,
    ethers: ethersJSConfig.eth_getTransactionByBlockNumberAndIndex,
  },
  eth_getTransactionReceipt: {
    description: t(`${root}.eth_getTransactionReceipt`),
    web3: web3JSConfig.eth_getTransactionReceipt,
    ethers: ethersJSConfig.eth_getTransactionReceipt,
  },
  eth_getUncleByBlockHashAndIndex: {
    description: t(`${root}.eth_getUncleByBlockHashAndIndex`),
    web3: web3JSConfig.eth_getUncleByBlockHashAndIndex,
    ethers: ethersJSConfig.eth_getUncleByBlockHashAndIndex,
  },
  eth_getUncleByBlockNumberAndIndex: {
    description: t(`${root}.eth_getUncleByBlockNumberAndIndex`),
    web3: web3JSConfig.eth_getUncleByBlockNumberAndIndex,
    ethers: ethersJSConfig.eth_getUncleByBlockNumberAndIndex,
  },
  eth_getCompilers: {
    description: t(`${root}.eth_getCompilers`),
    web3: web3JSConfig.eth_getCompilers,
    ethers: ethersJSConfig.eth_getCompilers,
  },
  eth_compileSolidity: {
    description: t(`${root}.eth_compileSolidity`),
    web3: web3JSConfig.eth_compileSolidity,
    ethers: ethersJSConfig.eth_compileSolidity,
  },
  eth_compileSerpent: {
    description: t(`${root}.eth_compileSerpent`),
    web3: web3JSConfig.eth_compileSerpent,
    ethers: ethersJSConfig.eth_compileSerpent,
  },
  eth_newFilter: {
    description: t(`${root}.eth_newFilter`),
    web3: web3JSConfig.eth_newFilter,
    ethers: ethersJSConfig.eth_newFilter,
  },
  eth_newBlockFilter: {
    description: t(`${root}.eth_newBlockFilter`),
    web3: web3JSConfig.eth_newBlockFilter,
    ethers: ethersJSConfig.eth_newBlockFilter,
  },
  eth_newPendingTransactionFilter: {
    description: t(`${root}.eth_newPendingTransactionFilter`),
    web3: web3JSConfig.eth_newPendingTransactionFilter,
    ethers: ethersJSConfig.eth_newPendingTransactionFilter,
  },
  eth_uninstallFilter: {
    disabled: true,
    description: t(`${root}.eth_uninstallFilter`),
    web3: web3JSConfig.eth_uninstallFilter,
    ethers: ethersJSConfig.eth_uninstallFilter,
  },
  eth_getFilterChanges: {
    disabled: true,
    description: t(`${root}.eth_getFilterChanges`),
    web3: web3JSConfig.eth_getFilterChanges,
    ethers: ethersJSConfig.eth_getFilterChanges,
  },
  eth_getFilterLogs: {
    disabled: true,
    description: t(`${root}.eth_getFilterLogs`),
    web3: web3JSConfig.eth_getFilterLogs,
    ethers: ethersJSConfig.eth_getFilterLogs,
  },
  eth_getLogs: {
    disabled: true,
    description: t(`${root}.eth_getLogs`),
    web3: web3JSConfig.eth_getLogs,
    ethers: ethersJSConfig.eth_getLogs,
  },
  eth_getWork: {
    description: t(`${root}.eth_getWork`),
    web3: web3JSConfig.eth_getWork,
    ethers: ethersJSConfig.eth_getWork,
  },
  trace_block: {
    description: t(`${root}.trace_block`),
    web3: web3JSConfig.trace_block,
    ethers: ethersJSConfig.trace_block,
  },
  trace_transaction: {
    description: t(`${root}.trace_transaction`),
    web3: web3JSConfig.trace_transaction,
    ethers: ethersJSConfig.trace_transaction,
  },
  trace_get: {
    description: t(`${root}.trace_get`),
    web3: web3JSConfig.trace_get,
    ethers: ethersJSConfig.trace_get,
  },
  trace_rawTransaction: {
    description: t(`${root}.trace_rawTransaction`),
    web3: web3JSConfig.trace_rawTransaction,
    ethers: ethersJSConfig.trace_rawTransaction,
  },
  trace_replayBlockTransactions: {
    description: t(`${root}.trace_replayBlockTransactions`),
    web3: web3JSConfig.trace_replayBlockTransactions,
    ethers: ethersJSConfig.trace_replayBlockTransactions,
  },
  trace_replayTransaction: {
    description: t(`${root}.trace_replayTransaction`),
    web3: web3JSConfig.trace_replayTransaction,
    ethers: ethersJSConfig.trace_replayTransaction,
  },
  trace_filter: {
    description: t(`${root}.trace_filter`),
    web3: web3JSConfig.trace_filter,
    ethers: ethersJSConfig.trace_filter,
  },
  trace_call: {
    description: t(`${root}.trace_call`),
    web3: web3JSConfig.trace_call,
    ethers: ethersJSConfig.trace_call,
  },
};
