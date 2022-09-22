export enum BlockNumberConstant {
  EARLIEST = 'earliest',
  LATEST = 'latest',
  PENDING = 'pending',
}

export enum EVMLibraryID {
  WEB3 = 'web3',
  ETHERS = 'ethers',
}

export const EVMLibrary = {
  [EVMLibraryID.WEB3]: 'web3.js',
  [EVMLibraryID.ETHERS]: 'ethers.js',
};

export enum EVMMethod {
  web3_clientVersion = 'web3_clientVersion',
  web3_sha3 = 'web3_sha3',
  net_version = 'net_version',
  net_listening = 'net_listening',
  net_peerCount = 'net_peerCount',
  eth_protocolVersion = 'eth_protocolVersion',
  eth_syncing = 'eth_syncing',
  eth_coinbase = 'eth_coinbase',
  eth_mining = 'eth_mining',
  eth_hashrate = 'eth_hashrate',
  eth_gasPrice = 'eth_gasPrice',
  eth_accounts = 'eth_accounts',
  eth_blockNumber = 'eth_blockNumber',
  eth_getBalance = 'eth_getBalance',
  eth_getStorageAt = 'eth_getStorageAt',
  eth_getTransactionCount = 'eth_getTransactionCount',
  eth_getBlockTransactionCountByHash = 'eth_getBlockTransactionCountByHash',
  eth_getBlockTransactionCountByNumber = 'eth_getBlockTransactionCountByNumber',
  eth_getUncleCountByBlockHash = 'eth_getUncleCountByBlockHash',
  eth_getUncleCountByBlockNumber = 'eth_getUncleCountByBlockNumber',
  eth_getCode = 'eth_getCode',
  eth_sign = 'eth_sign',
  eth_signTransaction = 'eth_signTransaction',
  eth_sendTransaction = 'eth_sendTransaction',
  eth_sendRawTransaction = 'eth_sendRawTransaction',
  eth_call = 'eth_call',
  eth_estimateGas = 'eth_estimateGas',
  eth_getBlockByHash = 'eth_getBlockByHash',
  eth_getBlockByNumber = 'eth_getBlockByNumber',
  eth_getTransactionByHash = 'eth_getTransactionByHash',
  eth_getTransactionByBlockHashAndIndex = 'eth_getTransactionByBlockHashAndIndex',
  eth_getTransactionByBlockNumberAndIndex = 'eth_getTransactionByBlockNumberAndIndex',
  eth_getTransactionReceipt = 'eth_getTransactionReceipt',
  eth_getUncleByBlockHashAndIndex = 'eth_getUncleByBlockHashAndIndex',
  eth_getUncleByBlockNumberAndIndex = 'eth_getUncleByBlockNumberAndIndex',
  eth_getCompilers = 'eth_getCompilers',
  eth_compileSolidity = 'eth_compileSolidity',
  eth_compileSerpent = 'eth_compileSerpent',
  eth_newFilter = 'eth_newFilter',
  eth_newBlockFilter = 'eth_newBlockFilter',
  eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter',
  eth_uninstallFilter = 'eth_uninstallFilter',
  eth_getFilterChanges = 'eth_getFilterChanges',
  eth_getFilterLogs = 'eth_getFilterLogs',
  eth_getLogs = 'eth_getLogs',
  eth_getWork = 'eth_getWork',
  trace_block = 'trace_block',
  trace_transaction = 'trace_transaction',
  trace_get = 'trace_get',
  trace_rawTransaction = 'trace_rawTransaction',
  trace_replayBlockTransactions = 'trace_replayBlockTransactions',
  trace_replayTransaction = 'trace_replayTransaction',
  // TODO trace
  trace_filter = 'trace_filter',
  trace_call = 'trace_call',
}

export enum TraceType {
  STATE_DIFF = 'stateDiff',
  TRACE = 'trace',
  VM_TRACE = 'vmTrace',
}
