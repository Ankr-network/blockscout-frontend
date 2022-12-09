import { ArgumentType } from 'domains/requestComposer/components/MethodsForm/MethodsFormUtils';
import { HarmonyMethod } from 'domains/requestComposer/constants/harmony';
import { ILibraryConfig } from 'domains/requestComposer/types/harmony';

const Template = (url: string, method: HarmonyMethod, args: any) => {
  return `curl -d '{"jsonrpc":"2.0","method":"${method}","params":${JSON.stringify(
    args,
  )},"id":1}' -H "Content-Type: application/json" -X POST "${url}"`;
};

export const harmonyJSConfig: ILibraryConfig = {
  hmyv2_call: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'from',
        description:
          '20 Bytes - (optional) The address the transaction is sent from.',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'to',
        description: '20 Bytes - The address the transaction is directed to.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gas',
        description:
          '(optional) Hex of the gas provided for the transaction execution.',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gasPrice',
        description: '(optional) Hex of the gas price used for each paid gas. ',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'value',
        description: '(optional) Hex of the value sent with this transaction.',
        placeholder: 'i.e. 0x2',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'data',
        description:
          '(optional) Hash of the method signature and encoded parameters.',
      },
      {
        type: ArgumentType.textfield,
        description: `Hex of a block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmyv2_estimateGas: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'from',
        description:
          '20 Bytes - (optional) The address the transaction is sent from.',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'to',
        description:
          '20 Bytes - (optional) The address the transaction is directed to.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gas',
        description:
          '(optional) Hex of the gas provided for the transaction execution.',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gasPrice',
        description: '(optional) Hex of the gas price used for each paid gas. ',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'value',
        description: '(optional) Hex of the value sent with this transaction.',
        placeholder: 'i.e. 0x2',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'data',
        description:
          '(optional) Hash of the method signature and encoded parameters.',
      },
      {
        type: ArgumentType.textfield,
        description: `(optional) Hex of a block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmyv2_getCode: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: 'The address to get the code from.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        description:
          'Block to query for information. Usually latest, which specifies the most recent block.',
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmyv2_getStorageAt: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `20 Bytes - address of the storage.`,
        placeholder: 'i.e. 0x295a70b2de5e3953354a6a8344e616ed314d7251',
      },
      {
        type: ArgumentType.textfield,
        description: `integer of the position in the storage.`,
        placeholder: 'i.e. 0x0',
      },
      {
        type: ArgumentType.textfield,
        description: `integer block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmyv2_getDelegationsByDelegator: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `delegator bech32 address.`,
        placeholder: 'i.e. one129r9pj3sk0re76f7zs3qz92rggmdgjhtwge62k',
      },
    ],
  },
  hmyv2_getDelegationsByValidator: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one1km7xg8e3xjys7azp9f4xp8hkw79vm2h3f2lade',
      },
    ],
  },
  hmyv2_getAllValidatorAddresses: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getAllValidatorInformation: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getAllValidatorInformationByBlockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `page num (default use 0)`,
        placeholder: 'i.e. 0',
      },
      {
        type: ArgumentType.number,
        description: `block number`,
        placeholder: 'i.e. 7376688',
      },
    ],
  },
  hmyv2_getElectedValidatorAddresses: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getValidatorInformation: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one14438psd5vrjes7qm97jrj3t0s5l4qff5j5cn4h',
      },
    ],
  },
  hmyv2_getCurrentUtilityMetrics: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getMedianRawStakeSnapshot: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getStakingNetworkInfo: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getSuperCommittees: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_getCXReceiptByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `transactions hash for cx receipt`,
        placeholder:
          'i.e. 0xc6da1349d2c2fbb5724126fe9e462996f8f8b415275e411d39a72945d3cb05ef',
      },
    ],
  },
  hmyv2_getPendingCXReceipts: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getPoolStats: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_pendingStakingTransactions: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_pendingTransactions: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getCurrentStakingErrorSink: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getStakingTransactionByBlockNumberAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `The block's index in the chain.`,
        placeholder: 'i.e. 4',
      },
      {
        type: ArgumentType.number,
        description: 'The staking transactions index position.',
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getStakingTransactionByBlockHashAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'The block hash.',
        placeholder:
          'i.e. 0x428ead93e632d5255ea3d1fb61b02ab8493cf562a398af2159c33ecd53c62c16',
      },
      {
        type: ArgumentType.number,
        description: 'The staking transaction index position.',
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getStakingTransactionByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The staking transaction hash.`,
        placeholder:
          'i.e. 0x1dff358dad4d0fc95b11acc9826b190d8b7971ac26b3f7ebdee83c10cafaf86f',
      },
    ],
  },
  hmyv2_sendRawStakingTransaction: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `Transaction encoded in bytes.`,
        placeholder:
          'i.e. 0xf869808082520880809410a02a0a6e95a676ae23e2db04bea3d1b8b7ca2e880de0b6b3a7640000801ba0c8d0c5390086999b5b5a93373953c3c94b44dc8fd06d88a421a7c2461e9e4482a0730d7859d1e3109d499bcd75f00700729b9bc17b03940da4f84b6ea784f51eb1',
      },
    ],
  },
  hmyv2_getCurrentTransactionErrorSink: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getTransactionByBlockHashAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x428ead93e632d5255ea3d1fb61b02ab8493cf562a398af2159c33ecd53c62c16',
      },
      {
        type: ArgumentType.number,
        description: `The transactions index position.`,
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getTransactionByBlockNumberAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `The block's index in the chain.`,
        placeholder: 'i.e. 4',
      },
      {
        type: ArgumentType.number,
        description: `The transactions index position.`,
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getTransactionByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The transaction hash.`,
        placeholder:
          'i.e. 0x1dff358dad4d0fc95b11acc9826b190d8b7971ac26b3f7ebdee83c10cafaf86f',
      },
    ],
  },
  hmyv2_getTransactionReceipt: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The transaction hash.`,
        placeholder:
          'i.e. 0x2fa714e40389cbbceda0f77e707035c0ec8aa940e8e10c0d445813177ea71e7d',
      },
    ],
  },
  hmyv2_sendRawTransaction: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `Transaction encoded in bytes.`,
        placeholder:
          'i.e. 0xf869808082520880809410a02a0a6e95a676ae23e2db04bea3d1b8b7ca2e880de0b6b3a7640000801ba0c8d0c5390086999b5b5a93373953c3c94b44dc8fd06d88a421a7c2461e9e4482a0730d7859d1e3109d499bcd75f00700729b9bc17b03940da4f84b6ea784f51eb1',
      },
    ],
  },
  hmyv2_blockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getCirculatingSupply: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getEpoch: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getLastCrossLinks: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_getLeader: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_gasPrice: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getShardingStructure: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getTotalSupply: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getValidators: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `epoch number`,
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getValidatorKeys: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_protocolVersion: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getBlocks: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `starting block number`,
        placeholder: 'i.e. 1',
      },
      {
        type: ArgumentType.number,
        description: `ending block number`,
        placeholder: 'i.e. 2',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `(Optional) To show full tx or not`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'withSigners',
        description: `(Optional) Include block signes in blocks or not`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'inclStaking',
        description: `(Optional) To show staking txs or not`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmyv2_getBlockByNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `The block number. `,
        placeholder: 'i.e. 1',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `(Optional) To show full tx or not.`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'withSigners',
        description: `(Optional) Include block signes in blocks or not.`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'inclStaking',
        description: `(Optional) To show staking txs or not.`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmyv2_getBlockByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x660fe701f580ffebfcfb4af1836c9929c1fd0014d8d79d60749fecf52df7a90d',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `(Optional) To show full tx or not`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'withSigners',
        description: `(Optional) Include block signes in blocks or not`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'inclStaking',
        description: `(Optional) To show staking txs or not`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmyv2_getBlockSigners: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `block number`,
        placeholder: 'i.e. 1',
      },
    ],
  },
  hmyv2_getBlockSignersKeys: {
    codeSample: () => {
      return '🚫 This method is not supported!';
    },
    args: [],
  },
  hmyv2_getBlockTransactionCountByNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `The number of transactions in the given block.`,
        placeholder: 'i.e. 1',
      },
    ],
  },
  hmyv2_getBlockTransactionCountByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x660fe701f580ffebfcfb4af1836c9929c1fd0014d8d79d60749fecf52df7a90d',
      },
    ],
  },
  hmyv2_getHeaderByNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `Block number.`,
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmyv2_getLatestChainHeaders: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_latestHeader: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmyv2_getBalance: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'The address to get the balance of',
        placeholder: 'i.e. one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
      },
    ],
  },
  hmyv2_getBalanceByBlockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'The address to get the balance of',
        placeholder: 'i.e. one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
      },
      {
        type: ArgumentType.number,
        description: 'Block to get query for balance',
        placeholder: 'i.e. 1',
      },
    ],
  },
  hmyv2_getStakingTransactionsCount: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'Account address',
        placeholder: 'i.e. one1rgl8538wyygp6ltyl0efkrm0rlpftaertskl80',
      },
      {
        type: ArgumentType.textfield,
        description:
          'Block number to query for transaction count. Usually latest, which uses the most recent block.',
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmyv2_getStakingTransactionsHistory: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'address',
        description: `one address ("one1...")`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'txType',
        description: ` optional, Received or Sent, shows all transactions by default`,
        placeholder: 'i.e. ALL',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageSize',
        description: `optional, pagination page size, how much tx to show in single page, default is 100`,
        placeholder: 'i.e. 100',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageIndex',
        description: ` optional, pagination which page to show, default is 0`,
        placeholder: 'i.e. 0',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'order',
        description: `optional, "ASC", "DESC", default is "ASC", order by timestamp`,
        placeholder: 'i.e. ASC',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `optional, shows not just a hash but a full transaction if checked`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmyv2_getTransactionsCount: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'Account address',
        placeholder: 'i.e. one1rgl8538wyygp6ltyl0efkrm0rlpftaertskl80',
      },
      {
        type: ArgumentType.textfield,
        description: 'Block number to query for transaction count.',
        placeholder: 'i.e. 1',
      },
    ],
  },
  hmyv2_getTransactionsHistory: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'address',
        description: `one address ("one1...")`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'txType',
        description: ` optional, Received or Sent, shows all transactions by default`,
        placeholder: 'i.e. ALL',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageSize',
        description: `optional, pagination page size, how much tx to show in single page, default is 100`,
        placeholder: 'i.e. 100',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageIndex',
        description: ` optional, pagination which page to show, default is 0`,
        placeholder: 'i.e. 0',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'order',
        description: `optional, "ASC", "DESC", default is "ASC", order by timestamp`,
        placeholder: 'i.e. ASC',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `optional, shows not just a hash but a full transaction if checked`,
        placeholder: 'i.e. true',
      },
    ],
  },

  // api v1
  hmy_getBalanceByBlockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: 'The address to get the balance of',
        placeholder: 'i.e. one1z05g55zamqzfw9qs432n33gycdmyvs38xjemyl',
      },
      {
        type: ArgumentType.textfield,
        description: 'Block to get query for balance',
        placeholder: 'i.e. 0x1',
      },
    ],
  },
  hmy_getTransactionCount: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'Account address',
        placeholder: 'i.e. one1rgl8538wyygp6ltyl0efkrm0rlpftaertskl80',
      },
      {
        type: ArgumentType.textfield,
        description:
          'Block number to query for transaction count. Usually latest, which uses the most recent block.',
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmy_getStakingTransactionByBlockHashAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: 'The block hash.',
        placeholder:
          'i.e. 0x428ead93e632d5255ea3d1fb61b02ab8493cf562a398af2159c33ecd53c62c16',
      },
      {
        type: ArgumentType.textfield,
        description: 'The staking transaction index position.',
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  hmy_getStakingTransactionByBlockNumberAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `The block's index in the chain.`,
        placeholder: 'i.e. 0x4',
      },
      {
        type: ArgumentType.textfield,
        description: 'The staking transactions index position.',
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  hmy_getStakingTransactionByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The staking transaction hash.`,
        placeholder:
          'i.e. 0x1dff358dad4d0fc95b11acc9826b190d8b7971ac26b3f7ebdee83c10cafaf86f',
      },
    ],
  },
  hmy_getCurrentTransactionErrorSink: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getPendingCrossLinks: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getPendingCXReceipts: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getCXReceiptByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `transactions hash for cx receipt`,
        placeholder:
          'i.e. 0x6b106dc5619c86b6c0cb64b17e5c464e8008e08cf0f1bb0e3fa2657fb42daade',
      },
    ],
  },
  hmy_pendingTransactions: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_sendRawStakingTransaction: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `Transaction encoded in bytes.`,
        placeholder:
          'i.e. 0xf869808082520880809410a02a0a6e95a676ae23e2db04bea3d1b8b7ca2e880de0b6b3a7640000801ba0c8d0c5390086999b5b5a93373953c3c94b44dc8fd06d88a421a7c2461e9e4482a0730d7859d1e3109d499bcd75f00700729b9bc17b03940da4f84b6ea784f51eb1',
      },
    ],
  },
  hmy_getTransactionsHistory: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'address',
        description: `one address ("one1...")`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'txType',
        description: ` optional, Received or Sent, shows all transactions by default`,
        placeholder: 'i.e. ALL',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageSize',
        description: `optional, pagination page size, how much tx to show in single page, default is 100`,
        placeholder: 'i.e. 100',
      },
      {
        type: ArgumentType.number,
        fieldName: 'pageIndex',
        description: ` optional, pagination which page to show, default is 0`,
        placeholder: 'i.e. 0',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'order',
        description: `optional, "ASC", "DESC", default is "ASC", order by timestamp`,
        placeholder: 'i.e. ASC',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `optional, shows not just a hash but a full transaction if checked`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmy_sendRawTransaction: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `Transaction encoded in bytes.`,
        placeholder:
          'i.e. 0xf869808082520880809410a02a0a6e95a676ae23e2db04bea3d1b8b7ca2e880de0b6b3a7640000801ba0c8d0c5390086999b5b5a93373953c3c94b44dc8fd06d88a421a7c2461e9e4482a0730d7859d1e3109d499bcd75f00700729b9bc17b03940da4f84b6ea784f51eb1',
      },
    ],
  },
  hmy_getTransactionReceipt: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The transaction hash.`,
        placeholder:
          'i.e. 0x2fa714e40389cbbceda0f77e707035c0ec8aa940e8e10c0d445813177ea71e7d',
      },
    ],
  },
  hmy_getBlockTransactionCountByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x660fe701f580ffebfcfb4af1836c9929c1fd0014d8d79d60749fecf52df7a90d',
      },
    ],
  },
  hmy_getBlockTransactionCountByNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `The block number.`,
        placeholder: 'i.e. 0x66',
      },
    ],
  },
  hmy_getTransactionByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The transaction hash.`,
        placeholder:
          'i.e. 0x1dff358dad4d0fc95b11acc9826b190d8b7971ac26b3f7ebdee83c10cafaf86f',
      },
    ],
  },
  hmy_getTransactionByBlockNumberAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `The block's index in the chain.`,
        placeholder: 'i.e. 0x4',
      },
      {
        type: ArgumentType.textfield,
        description: `The transactions index position.`,
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  hmy_getTransactionByBlockHashAndIndex: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x428ead93e632d5255ea3d1fb61b02ab8493cf562a398af2159c33ecd53c62c16',
      },
      {
        type: ArgumentType.textfield,
        description: `The transactions index position.`,
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  hmy_getBlockByNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `The block number. `,
        placeholder: 'i.e. 0x66',
      },
      {
        type: ArgumentType.boolean,
        description: `If true, the returned block will contain all transactions in the block.`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmy_getBlockByHash: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `The block hash.`,
        placeholder:
          'i.e. 0x660fe701f580ffebfcfb4af1836c9929c1fd0014d8d79d60749fecf52df7a90d',
      },
      {
        type: ArgumentType.boolean,
        description: `If true, the returned block will contain all transactions in the block.`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmy_getBlocks: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `starting block number in 0x format`,
        placeholder: 'i.e. 0x0',
      },
      {
        type: ArgumentType.textfield,
        description: `ending block number in 0x format`,
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'fullTx',
        description: `(Optional) To show full tx or not`,
        placeholder: 'i.e. true',
      },
      {
        type: ArgumentType.boolean,
        fieldName: 'withSigners',
        description: `(Optional) Include block signes in blocks or not`,
        placeholder: 'i.e. true',
      },
    ],
  },
  hmy_estimateGas: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'from',
        description:
          '20 Bytes - (optional) The address the transaction is sent from.',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'to',
        description:
          '20 Bytes - (optional) The address the transaction is directed to.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gas',
        description:
          '(optional) Hex of the gas provided for the transaction execution.',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gasPrice',
        description: '(optional) Hex of the gas price used for each paid gas. ',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'value',
        description: '(optional) Hex of the value sent with this transaction.',
        placeholder: 'i.e. 0x2',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'data',
        description:
          '(optional) Hash of the method signature and encoded parameters.',
      },
      {
        type: ArgumentType.textfield,
        description: `(optional) Hex of a block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmy_getStorageAt: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `20 Bytes - address of the storage.`,
        placeholder: 'i.e. 0x295a70b2de5e3953354a6a8344e616ed314d7251',
      },
      {
        type: ArgumentType.textfield,
        description: `integer of the position in the storage.`,
        placeholder: 'i.e. 0x0',
      },
      {
        type: ArgumentType.textfield,
        description: `integer block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmy_call: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        fieldName: 'from',
        description:
          '20 Bytes - (optional) The address the transaction is sent from.',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'to',
        description: '20 Bytes - The address the transaction is directed to.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gas',
        description:
          '(optional) Hex of the gas provided for the transaction execution.',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'gasPrice',
        description: '(optional) Hex of the gas price used for each paid gas. ',
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textfield,
        fieldName: 'value',
        description: '(optional) Hex of the value sent with this transaction.',
        placeholder: 'i.e. 0x2',
      },
      {
        type: ArgumentType.textarea,
        fieldName: 'data',
        description:
          '(optional) Hash of the method signature and encoded parameters.',
      },
      {
        type: ArgumentType.textfield,
        description: `Hex of a block number, or the string "latest", "earliest" or "pending"`,
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmy_getCode: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: 'The address to get the code from.',
        placeholder: 'i.e. 0x08AE1abFE01aEA60a47663bCe0794eCCD5763c19',
      },
      {
        type: ArgumentType.textfield,
        description:
          'Block to query for information. Usually latest, which specifies the most recent block.',
        placeholder: 'i.e. latest',
      },
    ],
  },
  hmy_isLastBlock: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `block height`,
        placeholder: 'i.e. 10',
      },
    ],
  },
  hmy_epochLastBlock: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `epoch`,
        placeholder: 'i.e. 10',
      },
    ],
  },
  hmy_latestHeader: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getShardingStructure: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_blockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_gasPrice: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getEpoch: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getLeader: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getCirculatingSupply: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getTotalSupply: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getStakingNetworkInfo: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getAllValidatorInformation: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getAllValidatorInformationByBlockNumber: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `page num (default use 0)`,
        defaultValue: 0,
        placeholder: 'i.e. 0',
      },
      {
        type: ArgumentType.number,
        description: `block number`,
        placeholder: 'i.e. 7376688',
      },
    ],
  },
  hmy_getCurrentUtilityMetrics: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getDelegationsByValidator: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one1km7xg8e3xjys7azp9f4xp8hkw79vm2h3f2lade',
      },
    ],
  },
  hmy_getDelegationsByDelegatorAndValidator: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `delegator bech32 address.`,
        placeholder: 'i.e. one1km7xg8e3xjys7azp9f4xp8hkw79vm2h3f2lade',
      },
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one129r9pj3sk0re76f7zs3qz92rggmdgjhtwge62k',
      },
    ],
  },
  hmy_getDelegationsByDelegator: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `delegator bech32 address.`,
        placeholder: 'i.e. one129r9pj3sk0re76f7zs3qz92rggmdgjhtwge62k',
      },
    ],
  },
  hmy_getValidatorMetrics: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
    ],
  },
  hmy_getMedianRawStakeSnapshot: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getActiveValidatorAddresses: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getAllValidatorAddresses: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getCurrentStakingErrorSink: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [],
  },
  hmy_getValidatorInformation: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator bech32 address.`,
        placeholder: 'i.e. one14438psd5vrjes7qm97jrj3t0s5l4qff5j5cn4h',
      },
    ],
  },
  hmy_getValidators: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.number,
        description: `epoch number`,
        defaultValue: 0,
        placeholder: 'i.e. 0',
      },
    ],
  },
  hmy_getSignedBlocks: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textarea,
        description: `validator one address ("one1...")`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
    ],
  },
  hmy_isBlockSigner: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `block number in string 0x format`,
        placeholder: 'i.e. 0x1',
      },
      {
        type: ArgumentType.textarea,
        description: `validator one address ("one1...")`,
        placeholder: 'i.e. one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7',
      },
    ],
  },
  hmy_getBlockSigners: {
    codeSample: (url, method, args) => {
      return Template(url, method, args);
    },
    args: [
      {
        type: ArgumentType.textfield,
        description: `block number in string 0x format`,
        placeholder: 'i.e. 0x1',
      },
    ],
  },
};
