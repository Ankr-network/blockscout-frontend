import { ethers, BigNumber } from 'ethers';

import { ILibraryConfig } from '../types';

const ethersTemplate = (
  methodCall: string,
  varName: string,
  httpUrl: string,
  wssUrl: string,
) => {
  return `const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('${httpUrl}');
  const ${varName} = await provider.${methodCall};
  console.log(${varName});
})();


${
  wssUrl &&
  `// WebSocket version
(async () => {
  const provider = new ethers.providers.WebSocketProvider('${wssUrl}');
  const ${varName} = await provider.${methodCall};
  console.log(${varName});
})();`
}`;
};

// TODO: Add Websocket example?
const contractTemplate = (httpUrl: string, args: any[]) => {
  const [address, abi, method, methodArgumentsString] = args;
  return `const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const abi = ${abi && JSON.stringify(abi)}
  const provider = new ethers.providers.JsonRpcProvider('${httpUrl}');
  const contract = new ethers.Contract('${address}', abi, provider);
  const response = await contract.functions.${method}(${methodArgumentsString});
  console.log(response);
})();
  `;
};

const contractTraceTemplate = (httpUrl: string, args: string[]) => {
  const [
    traceTypeList,
    block,
    from,
    value,
    contract,
    abi,
    method,
    methodArgumentsString,
  ] = args;
  return `const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const abi = ${abi && JSON.stringify(abi)}
  const provider = new ethers.providers.JsonRpcProvider('${httpUrl}');
  const iface = new ethers.utils.Interface(abi);
  const data = iface.encodeFunctionData("${method}"${
    methodArgumentsString ? ` , [${methodArgumentsString}]` : ''
  }); ${from ? `\n  const from = "${from}";` : ''}
  const to = "${contract}"; ${value ? `\n  const value = "${value}";` : ''}
  const transaction = { ${from ? `\n    from,` : ''}
    to,${value ? `\n    value,` : ''}
    data,
  };
  const response = await provider.send('trace_call', [transaction, ${traceTypeList}, ${block}]);
  console.log(response);
})();
  `;
};

const filterTemplate = (
  httpUrl: string,
  filterMethod: string,
  filter?: string,
  wssUrl?: string,
) => {
  return `const ethers = require("ethers");
// OR import ethers from 'ethers';
${filter ? `\n${filter}\n` : ''}
// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('${httpUrl}');
  const filterId = await provider.send('${filterMethod}'${
    filter ? ', [filter]' : ''
  })
  console.log(filterId);
  const logs = await provider.send('eth_getFilterChanges', [filterId]);
  console.log(logs);
})();

${
  wssUrl &&
  `// WebSocket version
(async () => {
  const provider = new ethers.providers.WebSocketProvider('${wssUrl}');
  const filterId = await provider.send('${filterMethod}'${
    filter ? ', [filter]' : ''
  })
  console.log(filterId);
  const logs = await provider.send('eth_getFilterChanges', [filterId]);
  console.log(logs);
})();`
}`;
};

const IS_ETH_CALL_DISABLED = true;

export const ethersJSConfig: ILibraryConfig = {
  web3_clientVersion: {
    exec: provider => {
      return provider.send('web3_clientVersion');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('web3_clientVersion')",
        'version',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  web3_sha3: {
    exec: (provider, ...args) => {
      return provider.send('web3_sha3', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('web3_sha3', ['${args[0]}'])`,
        'hash',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'The hexified data to convert into a SHA3 hash',
        placeholder: 'i.e. 0x68656c6c6f20776f726c64',
      },
    ],
  },
  net_version: {
    exec: provider => {
      return provider.send('net_version');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(`send('net_version')`, 'network', httpUrl, wssUrl);
    },
    args: [],
  },
  net_listening: {
    exec: provider => {
      return provider.send('net_listening');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('net_listening')",
        'listening',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  net_peerCount: {
    exec: provider => {
      return provider.send('net_peerCount');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate("send('net_peerCount')", 'peers', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_protocolVersion: {
    exec: provider => {
      return provider.send('eth_protocolVersion');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('eth_protocolVersion')",
        'version',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_syncing: {
    exec: provider => {
      return provider.send('eth_syncing');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('eth_syncing')",
        'isSyncing',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_coinbase: {
    exec: provider => {
      return provider.send('eth_coinbase');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('eth_coinbase')",
        'coinbase',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_mining: {
    exec: provider => {
      return provider.send('eth_mining');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate("send('eth_mining')", 'isMining', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_hashrate: {
    exec: provider => {
      return provider.send('eth_hashrate');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('eth_hashrate')",
        'hashRate',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_gasPrice: {
    exec: provider => {
      return provider
        .getGasPrice()
        .then((resp: any) => BigNumber.from(resp._hex).toString());
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate('getGasPrice()', 'gasPrice', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_accounts: {
    exec: provider => {
      return provider.send('eth_accounts');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate("send('eth_accounts')", 'accts', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_blockNumber: {
    exec: provider => {
      return provider.getBlockNumber();
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate('getBlockNumber()', 'blockNum', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_getBalance: {
    exec: (provider, ...args) => {
      return provider
        .getBalance(...args)
        .then((resp: any) => BigNumber.from(resp._hex).toString());
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `getBalance('${args[0]}', '${args[1]}')`,
        'balance',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Address to check for balance',
        placeholder: 'i.e. 0x91b51c173a4...',
      },
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  eth_getStorageAt: {
    exec: (provider, ...args) => {
      return provider.getStorageAt(...args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `getStorageAt('${args[0]}', '${args[1]}', '${args[2]}')`,
        'storage',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Address of the storage',
        placeholder: 'i.e. 0x91b51c173a4... or ENS domain',
      },
      {
        type: 'textfield',
        description: 'Hex of the position in the storage',
        placeholder: 'i.e. 0x0, 0x1, 0x2...',
      },
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  eth_getTransactionCount: {
    exec: (provider, ...args) => {
      return provider.getTransactionCount(...args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `getTransactionCount('${args[0]}', '${args[1]}')`,
        'txCount',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Address to check for balance',
        placeholder: 'i.e. 0x91b51c173a4...',
      },
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  eth_getBlockTransactionCountByHash: {
    exec: (provider, ...args) => {
      return provider.send('eth_getBlockTransactionCountByHash', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getBlockTransactionCountByHash', ['${args[0]}'])`,
        'txCount',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get transaction count from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
    ],
  },
  eth_getBlockTransactionCountByNumber: {
    exec: (provider, ...args) => {
      return provider.send('eth_getBlockTransactionCountByNumber', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getBlockTransactionCountByNumber', ['${args[0]}'])`,
        'txCount',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hex of a block to get transaction count from',
        placeholder: 'i.e. 0x9C6EFE',
      },
    ],
  },
  eth_getUncleCountByBlockHash: {
    exec: (provider, ...args) => {
      return provider.send('eth_getUncleCountByBlockHash', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getUncleCountByBlockHash', ['${args[0]}'])`,
        'uncleCount',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get uncle count from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
    ],
  },
  eth_getUncleCountByBlockNumber: {
    exec: (provider, ...args) => {
      return provider.send('eth_getUncleCountByBlockNumber', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getUncleCountByBlockNumber', ['${args[0]}'])`,
        'uncleCount',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hex of a block to get uncle count from',
        placeholder: 'i.e. 0x9C6EFE',
      },
    ],
  },
  eth_getCode: {
    exec: (provider, ...args) => {
      return provider.getCode(...args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `getCode('${args[0]}', '${args[1]}')`,
        'code',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Address to fetch code from',
        placeholder: 'i.e. 0x91b51c173a4...',
      },
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  eth_sign: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject('Not Supported'),
      );
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_signTransaction: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject('Not Supported'),
      );
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_sendTransaction: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject('Not Supported'),
      );
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_sendRawTransaction: {
    exec: (provider, ...args) => {
      return provider.sendTransaction(...args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `sendTransaction('${args[0]}')`,
        'tx',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'The previously signed transaction data',
        placeholder:
          'i.e. 0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
      },
    ],
  },
  eth_call: {
    exec: IS_ETH_CALL_DISABLED
      ? () => {
          return new Promise((resolve, reject) =>
            // eslint-disable-next-line
            reject('Not Supported'),
          );
        }
      : (provider, ...args) => {
          const [address, abi, method, ...rest] = args;
          const contract = new ethers.Contract(address, abi, provider);
          return contract.functions[method](...rest);
        },
    codeSample: (httpUrl, ...args) => {
      return IS_ETH_CALL_DISABLED
        ? '/* Not Supported */'
        : contractTemplate(httpUrl, args);
    },
    args: IS_ETH_CALL_DISABLED
      ? []
      : [
          {
            type: 'textarea',
            description: 'Address of contract',
            placeholder: 'i.e. 0x91b51c173a4...',
          },
          {
            type: 'textarea',
            description: 'Contract ABI (URL or single function object)',
            placeholder:
              'i.e. [{"inputs":[{"name":"chainId...\nOR\nhttps://raw.githubusercontent.com/.../build/contracts/ERC20.json',
          },
          {
            type: 'dropdown',
            description: 'Function name (READ only)',
          },
        ],
  },
  eth_estimateGas: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject('Not Supported'),
      );
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_getBlockByHash: {
    exec: (provider, ...args) => {
      if (args[1] === true) {
        return provider.getBlockWithTransactions(args[0]);
      }
      return provider.getBlock(args[0]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      if (args[1] === true) {
        return ethersTemplate(
          `getBlockWithTransactions('${args[0]}')`,
          'blockData',
          httpUrl,
          wssUrl,
        );
      }
      return ethersTemplate(
        `getBlock('${args[0]}')`,
        'blockData',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get information from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
      {
        type: 'boolean',
        description: 'Should we return full transaction objects?',
        placeholder: '',
      },
    ],
  },
  eth_getBlockByNumber: {
    exec: (provider, ...args) => {
      if (args[1] === true) {
        return provider.getBlockWithTransactions(args[0]);
      }

      return provider.getBlock(args[0]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      if (args[1] === true) {
        return ethersTemplate(
          `getBlockWithTransactions('${args[0]}')`,
          'blockData',
          httpUrl,
          wssUrl,
        );
      }

      return ethersTemplate(
        `getBlock('${args[0]}')`,
        'blockData',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hex of a block number to get information from',
        placeholder: 'i.e. 0x9C6EFE',
      },
      {
        type: 'boolean',
        description: 'Should we return full transaction objects?',
        placeholder: '',
      },
    ],
  },
  eth_getTransactionByHash: {
    exec: (provider, ...args) => {
      return provider.send('eth_getTransactionByHash', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getTransactionByHash', ['${args[0]}'])`,
        'txInfo',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get information for',
        placeholder:
          'i.e. 0x95575ee5f6cdb3907cd2983516f33828855ed4f12320103dc8524b96a5a5414b',
      },
    ],
  },
  eth_getTransactionByBlockHashAndIndex: {
    exec: (provider, ...args) => {
      return provider.send('eth_getTransactionByBlockHashAndIndex', [...args]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getTransactionByBlockHashAndIndex', ['${args[0]}', '${args[1]}'])`,
        'txInfo',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get information from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
      {
        type: 'textfield',
        description: 'Hex of tx position in the block',
        placeholder: 'i.e. 0x0, 0x1, 0x2...',
      },
    ],
  },
  eth_getTransactionByBlockNumberAndIndex: {
    exec: (provider, ...args) => {
      return provider.send('eth_getTransactionByBlockNumberAndIndex', [
        ...args,
      ]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getTransactionByBlockNumberAndIndex', ['${args[0]}', '${args[1]}'])`,
        'txInfo',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
      {
        type: 'textfield',
        description: 'Hex of tx position in the block',
        placeholder: 'i.e. 0x0, 0x1, 0x2...',
      },
    ],
  },
  eth_getTransactionReceipt: {
    exec: (provider, ...args) => {
      return provider.waitForTransaction(...args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `waitForTransaction('${args[0]}')`,
        'txReceipt',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get information for',
        placeholder:
          'i.e. 0x95575ee5f6cdb3907cd2983516f33828855ed4f12320103dc8524b96a5a5414b',
      },
    ],
  },
  eth_getUncleByBlockHashAndIndex: {
    exec: (provider, ...args) => {
      return provider.send('eth_getUncleByBlockHashAndIndex', args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getUncleByBlockHashAndIndex', ['${args[0]}', '${args[1]}'])`,
        'blockUncle',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get information from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
      {
        type: 'textfield',
        description: 'The uncle’s index position.',
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  eth_getUncleByBlockNumberAndIndex: {
    exec: (provider, ...args) => {
      return provider.send('eth_getUncleByBlockNumberAndIndex', args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_getUncleByBlockNumberAndIndex', ['${args[0]}', '${args[1]}']`,
        'blockUncle',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0x29c',
      },
      {
        type: 'textfield',
        description: 'The uncle’s index position.',
        placeholder: 'i.e. 0x0',
      },
    ],
  },
  eth_getCompilers: {
    exec: provider => {
      return provider.send('eth_getCompilers');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(
        "send('eth_getCompilers')",
        'compilerList',
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_compileSolidity: {
    exec: (provider, ...args) => {
      return provider.send('eth_compileSolidity', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_compileSolidity', ['${args[0]}'])`,
        'compiledCode',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'The source code you wish to compile.',
        placeholder:
          'i.e. contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }',
      },
    ],
  },
  eth_compileSerpent: {
    exec: (provider, ...args) => {
      return provider.send('eth_compileSerpent', args);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('eth_compileSerpent', ['${args[0]}'])`,
        'compiledCode',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'The source code you wish to compile.',
        placeholder: 'i.e. /* some serpent */',
      },
    ],
  },
  eth_newFilter: {
    exec: async (provider, ...args) => {
      const filter = {} as any;
      filter.topics = args[3]
        ? args[3]
            .split(',')
            .map((x: any) => (x === 'null' ? null : x.split('||')))
        : [];
      filter.fromBlock = args[0] ? args[0] : 'latest';
      filter.toBlock = args[1] ? args[1] : 'latest';
      filter.address = args[2] ? args[2] : null;

      const filterId = await provider.send('eth_newFilter', [filter]);
      return provider.send('eth_getFilterChanges', [filterId]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      const filter = `const filter = {
  ${
    args[0] // eslint-disable-next-line
      ? "fromBlock: '" + args[0] + "'"
      : "fromBlock: 'latest'"
  },
  ${
    args[1] // eslint-disable-next-line
      ? "toBlock: '" + args[1] + "'"
      : "toBlock: 'latest'"
  },${
        args[2] // eslint-disable-next-line
          ? "\n  address: '" + args[2] + "',"
          : ''
      }
  topics: ${
    args[3]
      ? JSON.stringify(
          args[3]
            .split(',')
            .map((x: any) => (x === 'null' ? null : x.split('||'))),
        )
      : '[]'
  }
};`;
      return filterTemplate(httpUrl, wssUrl, 'eth_newFilter', filter);
    },
    args: [
      {
        type: 'textfield',
        description:
          'fromBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0x29c',
      },
      {
        type: 'textfield',
        description:
          'toBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0x29c',
      },
      {
        type: 'textarea',
        description:
          'address: (optional) Contract address or a list of addresses from which logs should originate.',
        placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
      },
      {
        type: 'textarea',
        description:
          'topics: (optional) Comma separated strings with filter topics, for "or" functionality use ||. Topics are order-dependent.',
        placeholder: 'i.e. 0x1962||0x16c4,null',
      },
    ],
  },
  eth_newBlockFilter: {
    exec: async provider => {
      const filterId = await provider.send('eth_newBlockFilter');
      return provider.send('eth_getFilterChanges', [filterId]);
    },
    codeSample: httpUrl => filterTemplate(httpUrl, 'eth_newBlockFilter'),
    args: [],
  },
  eth_newPendingTransactionFilter: {
    exec: async provider => {
      const filterId = await provider.send('eth_newPendingTransactionFilter');
      return provider.send('eth_getFilterChanges', [filterId]);
    },
    codeSample: httpUrl =>
      filterTemplate(httpUrl, 'eth_newPendingTransactionFilter'),
    args: [],
  },
  eth_uninstallFilter: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject('Not Supported'),
      );
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_getFilterChanges: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject(
          'This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
        ),
      );
    },
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getFilterLogs: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject(
          'This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
        ),
      );
    },
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getLogs: {
    exec: () => {
      return new Promise((resolve, reject) =>
        // eslint-disable-next-line
        reject(
          'This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
        ),
      );
    },
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getWork: {
    exec: provider => {
      return provider.send('eth_getWork');
    },
    codeSample: (httpUrl, wssUrl) => {
      return ethersTemplate(`send('eth_getWork')`, 'work', httpUrl, wssUrl);
    },
    args: [],
  },
  trace_block: {
    exec: (provider, ...args) => {
      return provider.send('trace_block', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_block', ['${args[0]}'])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  trace_transaction: {
    exec: (provider, ...args) => {
      return provider.send('trace_transaction', [args[0]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_transaction', ['${args[0]}'])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get information for',
        placeholder:
          'i.e. 0x95575ee5f6cdb3907cd2983516f33828855ed4f12320103dc8524b96a5a5414b',
      },
    ],
  },
  trace_get: {
    exec: (provider, ...args) => {
      return provider.send('trace_get', [args[0], (args[1] || '').split(',')]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_get', ['${args[0]}', ['${(args[1] || '')
          .split(',')
          .join(', ')}']])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get information for',
        placeholder:
          'i.e. 0x95575ee5f6cdb3907cd2983516f33828855ed4f12320103dc8524b96a5a5414b',
      },
      {
        type: 'textfield',
        description: 'Index positions of the traces, separated by commas',
        placeholder: 'i.e. 0x0,0x2,0x4',
      },
    ],
  },
  trace_rawTransaction: {
    exec: (provider, ...args) => {
      return provider.send('trace_rawTransaction', [args[0], [args[1]]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_rawTransaction', ['${args[0]}', ['${args[1]}']])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Raw transaction data.',
        placeholder:
          'i.e. 0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_replayBlockTransactions: {
    exec: (provider, ...args) => {
      return provider.send('trace_replayBlockTransactions', [
        args[0],
        [args[1]],
      ]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_replayBlockTransactions', ['${args[0]}', ['${args[1]}']])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_replayTransaction: {
    exec: (provider, ...args) => {
      return provider.send('trace_replayTransaction', [args[0], [args[1]]]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_replayTransaction', ['${args[0]}', ['${args[1]}']])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get trace for',
        placeholder:
          'i.e. 0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_filter: {
    exec: (provider, ...args) => {
      const filter = {
        ...(args[2] && { fromAddress: [args[2]] }),
        ...(args[3] && { toAddress: [args[3]] }),
        ...(args[4] && { after: args[4] }),
        ...(args[5] && { count: args[5] }),
      };
      filter.fromBlock = args[0] ? args[0] : 'latest';
      filter.toBlock = args[1] ? args[1] : 'latest';

      return provider.send('trace_filter', [filter]);
    },
    codeSample: (httpUrl, wssUrl, ...args) => {
      return ethersTemplate(
        `send('trace_filter', [{
  "fromBlock": "${args[0] || 'latest'}",
  "toBlock": "${args[1] || 'latest'}",${
          args[2] // eslint-disable-next-line
            ? '\n\t"fromAddress": [' + args[2] + '],'
            : ''
        }${
          args[3] // eslint-disable-next-line
            ? '\n\t"toAddress": [' + args[3] + '],'
            : ''
        }${
          args[4] // eslint-disable-next-line
            ? '\n\t"after": ' + args[3] + ','
            : ''
        }${
          args[4] // eslint-disable-next-line
            ? '\n\t"count": ' + args[4] + ','
            : ''
        }
}])`,
        'trace',
        httpUrl,
        wssUrl,
      );
    },
    args: [
      {
        type: 'textfield',
        description:
          'fromBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0x29c',
      },
      {
        type: 'textfield',
        description:
          'toBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0x29c',
      },
      {
        type: 'textarea',
        description:
          'fromAddress: (optional) Contract address or a list of addresses from which logs should originate.',
        placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
      },
      {
        type: 'textarea',
        description:
          'toAddress: (optional) Contract address or a list of addresses to which logs should terminate.',
        placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
      },
      {
        type: 'textfield',
        description:
          'topics: (optional) The offset trace number as an integer.',
        placeholder: 'i.e. 1000',
      },
      {
        type: 'textfield',
        description:
          'topics: (optional) The number of traces to display in a batch as an integer.',
        placeholder: 'i.e. 10',
      },
    ],
  },
  trace_call: {
    exec: IS_ETH_CALL_DISABLED
      ? () => {
          return new Promise((resolve, reject) =>
            // eslint-disable-next-line
            reject('Not Supported'),
          );
        }
      : (provider, ...args) => {
          // eslint-disable-next-line
          let [traceType, block, from, value, contract, abi, method, ...rest] =
            args;
          const iface = new ethers.utils.Interface(abi);
          const data = iface.encodeFunctionData(method, rest);
          if (value === '') value = null;
          if (from === '') from = null;
          const transaction = {
            from,
            to: contract,
            value,
            data,
          };
          return provider.send('trace_call', [
            transaction,
            traceType.split(', '),
            block,
          ]);
        },
    codeSample: (httpUrl, ...args) =>
      IS_ETH_CALL_DISABLED
        ? '/* Not Supported */'
        : () => {
            const [traceType, block, ...rest] = args;
            return contractTraceTemplate(httpUrl, [
              JSON.stringify(traceType.split(', ')),
              JSON.stringify(block),
              ...rest,
            ]);
          },
    args: IS_ETH_CALL_DISABLED
      ? []
      : [
          {
            type: 'textfield',
            description:
              'Type of trace, one or more of: `vmTrace`, `trace`, `stateDiff`',
            placeholder: 'i.e. vmTrace, trace',
          },
          {
            type: 'textfield',
            description:
              'Hex block number, or the string "latest", "earliest" or "pending"',
            placeholder: 'i.e. latest or pending',
          },
          {
            type: 'textarea',
            description:
              'address: (optional) The address the transaction is sent from',
            placeholder: 'i.e. 0x19624ffa41f...',
          },
          {
            type: 'textfield',
            description:
              'value: (optional) Integer formatted as a hex string of the value sent with this transaction',
            placeholder: 'i.e. 0x19624ffa41f...',
          },
          {
            type: 'textarea',
            description: 'Address of contract',
            placeholder: 'i.e. 0x91b51c173a4...',
          },
          {
            type: 'textarea',
            description: 'Contract ABI (URL or single function object)',
            placeholder:
              'i.e. [{"inputs":[{"name":"chainId...\nOR\nhttps://raw.githubusercontent.com/.../build/contracts/ERC20.json',
          },
          {
            type: 'dropdown',
            description: 'Function name (READ only)',
          },
        ],
  },
};
