import { AxiosInstance } from 'axios';
import { utils } from 'ethers';
import { EVMMethod, TraceType } from '../constants';
import { ILibraryConfig } from '../types';
import { trim } from './parsers/trim';
import { isBlockNumberConstant } from './validators/isBlockNumberConstant';

const INDENT_SPACES = 4;

const formatArgs = (args: unknown[]) => {
  if (!args.length) {
    return '[]';
  }

  return JSON.stringify(
    args.map(arg =>
      typeof arg === 'string' ? arg.trim().replaceAll('\n', '') : arg,
    ),
    null,
    3 * INDENT_SPACES,
  ).replace(/\s*\]$/g, `\n${' '.repeat(2 * INDENT_SPACES)}]`);
};

const JsonRpcTemplate = (
  methodCall: string,
  varName: string,
  httpUrl: string,
  wssUrl: string,
  ...args: unknown[]
) => {
  return `
// HTTP version
(async () => {
  const response = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${methodCall}",
        params: ${formatArgs(args)},
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const ${varName} = await response.json();

  console.log(${varName});
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    console.log(event.data);
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${methodCall}",
          params: ${formatArgs(args)},
          id: "1" // * Must be unique in case of batching
        }));
  }
`
}
`;
};

const getFilterTags = (input = '') => {
  return input
    ? input
        .split(',')
        .map((x: any) => (x === 'null' ? null : x.split('||').map(trim)))
    : [];
};

const formatFilterTags = (input = '') => {
  const tags = input
    ? input
        .split(',')
        .map(trim)
        .map((x: any) =>
          x === 'null' ? null : x.split('||').map(trim).join('", "'),
        )
    : [];

  return tags.map(tag => tag && `["${tag}"]`).join(', ');
};

const JsonRpcEthNewFilterTemplate = (
  httpUrl: string,
  wssUrl: string,
  ...args: unknown[]
) => {
  args = args.map(trim);

  const [fromBlock, toBlock, address, topics] = args;

  return `
// HTTP version
(async () => {
  const filterResponse = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_newFilter}",
        params: [
          {
            "fromBlock": "${fromBlock}",
            "toBlock": "${toBlock}",
            ${address && `"address": "${address}",`}
            ${
              topics &&
              `"topics": [
              ${formatFilterTags(topics as string)}
            ]`
            }
          }
        ],
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const filterResponseData = await filterResponse.json();
  
  const filterId = filterResponseData.result
  
  const filterChanges = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_getFilterChanges}",
        params: [filterId],
        id: "2" // * Must be unique in case of batching
      })
    }
  );
  
  const logs = await filterChanges.json();

  console.log(logs); 
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    console.log(data);
    
    if (data.id === "1" && !data.error) {
      const filterId = data.result
      
      ws.send(JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_getFilterChanges}",
        params: [filterId],
        id: "2" // * Must be unique in case of batching
      }))
    }
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${EVMMethod.eth_newFilter}",
          params: [
            {
              "fromBlock": "${fromBlock}",
              "toBlock": "${toBlock}",
              ${address && `"address": "${address}",`}
              ${
                topics &&
                `"topics": [
                ${formatFilterTags(topics as string)}
              ]`
              }
            }
          ],
          id: "1" // * Must be unique in case of batching
    }));
  }
`
}
`;
};

const JsonRpcEthNoArgFilterTemplate = (
  method: EVMMethod,
  httpUrl: string,
  wssUrl: string,
) => {
  return `
// HTTP version
(async () => {
  const filterResponse = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${method}",
        params: [],
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const filterResponseData = await filterResponse.json();
  
  const filterId = filterResponseData.result
  
  const filterChanges = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_getFilterChanges}",
        params: [filterId],
        id: "2" // * Must be unique in case of batching
      })
    }
  );
  
  const logs = await filterChanges.json();

  console.log(logs); 
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)

    console.log(data);
    
    if (data.id === "1" && !data.error) {
      const filterId = data.result
      
      ws.send(JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_getFilterChanges}",
        params: [filterId],
        id: "2" // * Must be unique in case of batching
      }))
    }
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${method}",
          params: [],
          id: "1" // * Must be unique in case of batching
    }));
  }
`
}
`;
};

const JsonRpcEthCallTemplate = (
  varName: string,
  httpUrl: string,
  wssUrl: string,
  ...args: unknown[]
) => {
  args = args.map(trim);

  const [block, from, value, contractAddress, encodedAbiData, gas, gasPrice] =
    args;

  return `
// HTTP version
(async () => {
  const response = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.eth_call}",
        params: [
          {
            ${from && `"from": "${from}",`}
            "to": "${contractAddress}",
            ${gas && `"gas": ${gas},`}
            ${gasPrice && `"gasPrice": ${gasPrice},`}
            ${
              value &&
              `"value": [
              "${value}"
            ],`
            }
            "data": "${encodedAbiData}",
          },
          "${block}"
        ],
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const ${varName} = await response.json();

  console.log(${varName});
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    console.log(event.data);
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${EVMMethod.eth_call}",
          params: [
            {
              ${from && `"from": "${from}",`}
              "to": "${contractAddress}",
              ${gas && `"gas": ${gas},`}
              ${gasPrice && `"gasPrice": ${gasPrice},`}
              ${
                value &&
                `"value": [
                "${value}"
              ],`
              }
              "data": "${encodedAbiData}",
            },
            "${block}"
          ],
          id: "1" // * Must be unique in case of batching
        }));
  }
`
}
`;
};

const JsonRpcTraceFilterTemplate = (
  varName: string,
  httpUrl: string,
  wssUrl: string,
  ...args: unknown[]
) => {
  args = args.map(trim);

  return `
// HTTP version
(async () => {
  const response = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.trace_filter}",
        params: [{
          "fromblock": "${args[0]}",
          "toblock": "${args[1]}",
          ${
            args[2] &&
            `"fromaddress": [
            "${args[2]}"
          ],`
          }
          ${
            args[3] &&
            `"toaddress": [
            "${args[3]}"
          ],`
          }
          ${args[4] && `"after": ${args[4]},`}
          ${args[5] && `"count": ${args[5]},`}
        }],
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const ${varName} = await response.json();

  console.log(${varName});
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    console.log(event.data);
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${EVMMethod.trace_filter}",
          params: [{
            "fromblock": "${args[0]}",
            "toblock": "${args[1]}",
            ${
              args[2] &&
              `"fromaddress": [
              "${args[2]}"
            ],`
            }
            ${
              args[3] &&
              `"toaddress": [
              "${args[3]}"
            ],`
            }
            ${args[4] && `"after": ${args[4]},`}
            ${args[5] && `"count": ${args[5]},`}
          }],
          id: "1" // * Must be unique in case of batching
        }));
  }
`
}
`;
};

const JsonRpcTraceCallTemplate = (
  varName: string,
  httpUrl: string,
  wssUrl: string,
  ...args: unknown[]
) => {
  args = args.map(trim);

  const [
    traceType,
    block,
    from,
    value,
    contractAddress,
    encodedAbiData,
    gas,
    gasPrice,
  ] = args;

  return `
// HTTP version
(async () => {
  const response = await fetch(
    "${httpUrl}",
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        jsonrpc: "2.0",
        method: "${EVMMethod.trace_call}",
        params: [
          {
            ${from && `"from": "${from}",`}
            "to": "${contractAddress}",
            ${gas && `"gas": ${gas},`}
            ${gasPrice && `"gasPrice": ${gasPrice},`}
            ${
              value &&
              `"value": [
              "${value}"
            ],`
            }
            "data": "${encodedAbiData}",
          },
          [
            "${traceType}"
          ],
          "${block}"
        ],
        id: "1" // * Must be unique in case of batching
      })
    }
  );
  
  const ${varName} = await response.json();

  console.log(${varName});
})();


${
  wssUrl &&
  `
  // WebSocket version
  const ws = new WebSocket('${wssUrl}');

  ws.onmessage = (event) => {
    console.log(event.data);
  };
  
  ws.onopen = () => {
    ws.send(JSON.stringify({
          jsonrpc: "2.0",
          method: "${EVMMethod.trace_call}",
          params: [
            {
              ${from && `"from": "${from}",`}
              "to": "${contractAddress}",
              ${gas && `"gas": ${gas},`}
              ${gasPrice && `"gasPrice": ${gasPrice},`}
              ${
                value &&
                `"value": [
                "${value}"
              ],`
              }
              "data": "${encodedAbiData}",
            },
            [
              "${traceType}"
            ],
            "${block}"
          ],
          id: "1" // * Must be unique in case of batching
        }));
  }
`
}
`;
};

// TODO
/*
 * eth_newFilter, eth_newBlockFilter, eth_newPendingTransactionFilter, <- no WS?
 *
 * last method crash; trace_filter template in other libs doesn't use strings, incorrect last 2 args, incorrect after
 * eth_newFilter (ether.js) has an incorrect codeSample
 */

const getAxiosJsonRpcCaller =
  (method: EVMMethod) =>
  async (axios: AxiosInstance, ...args: any[]) => {
    const response = await axios.post('', {
      jsonrpc: '2.0',
      method,
      params: args,
      id: '1',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

const getAxiosJsonRpcEthNewFilterCaller =
  () =>
  async (axios: AxiosInstance, ...args: any[]) => {
    const filterResponse = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.eth_newFilter,
      params: [
        {
          fromBlock: args[0],
          toBlock: args[1],
          address: args[2],
          topics: args[3],
        },
      ],
      id: '1',
    });

    if (filterResponse.data.error) {
      throw filterResponse.data.error;
    }

    const filterId = filterResponse.data.result;

    const response = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.eth_getFilterChanges,
      params: [filterId],
      id: '2',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

const getAxiosJsonRpcEthNoArgFilterCaller =
  (method: EVMMethod) => async (axios: AxiosInstance) => {
    const filterResponse = await axios.post('', {
      jsonrpc: '2.0',
      method,
      params: [],
      id: '1',
    });

    if (filterResponse.data.error) {
      throw filterResponse.data.error;
    }

    const filterId = filterResponse.data.result;

    const response = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.eth_getFilterChanges,
      params: [filterId],
      id: '2',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

const getAxiosJsonRpcEthCallCaller =
  () =>
  async (axios: AxiosInstance, ...args: any[]) => {
    const [block, from, value, contractAddress, encodedAbiData, gas, gasPrice] =
      args;

    const response = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.eth_call,
      params: [
        {
          from,
          to: contractAddress,
          gas,
          gasPrice,
          value,
          data: encodedAbiData,
        },
        block,
      ],
      id: '1',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

const getAxiosJsonRpcTraceFilterCaller =
  () =>
  async (axios: AxiosInstance, ...args: any[]) => {
    const response = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.trace_filter,
      params: [
        {
          fromBlock: args[0],
          toBlock: args[1],
          fromAddress: [args[2]],
          toAddress: [args[3]],
          after: args[4],
          count: args[5],
        },
      ],
      id: '1',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

const getAxiosJsonRpcTraceCallCaller =
  () =>
  async (axios: AxiosInstance, ...args: any[]) => {
    const [
      traceType,
      block,
      from,
      value,
      contractAddress,
      encodedAbiData,
      gas,
      gasPrice,
    ] = args;

    const response = await axios.post('', {
      jsonrpc: '2.0',
      method: EVMMethod.trace_call,
      params: [
        {
          from,
          to: contractAddress,
          gas,
          gasPrice,
          value,
          data: encodedAbiData,
        },
        [traceType],
        block,
      ],
      id: '1',
    });

    if (response.data.error) {
      throw response.data.error;
    }

    return response.data.result;
  };

export const JsonRpcConfig: ILibraryConfig = {
  web3_clientVersion: {
    exec: getAxiosJsonRpcCaller(EVMMethod.web3_clientVersion),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('web3_clientVersion', 'version', httpUrl, wssUrl);
    },
    args: [],
  },
  web3_sha3: {
    exec: getAxiosJsonRpcCaller(EVMMethod.web3_sha3),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate('web3_sha3', 'hash', httpUrl, wssUrl, ...args);
    },
    args: [
      {
        type: 'textarea',
        description: 'The hexified data to convert into a SHA3 hash',
        placeholder: 'i.e. 0x68656c6c6f20776f726c64',
      },
    ],
    parseArgs: [trim],
  },
  net_version: {
    exec: getAxiosJsonRpcCaller(EVMMethod.net_version),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('net_version', 'network', httpUrl, wssUrl);
    },
    args: [],
  },
  net_listening: {
    exec: getAxiosJsonRpcCaller(EVMMethod.net_listening),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('net_listening', 'listening', httpUrl, wssUrl);
    },
    args: [],
  },
  net_peerCount: {
    exec: getAxiosJsonRpcCaller(EVMMethod.net_peerCount),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('net_peerCount', 'peers', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_protocolVersion: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_protocolVersion),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_protocolVersion', 'version', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_syncing: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_syncing),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_syncing', 'isSyncing', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_coinbase: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_coinbase),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_coinbase', 'coinbase', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_mining: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_mining),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_mining', 'isMining', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_hashrate: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_hashrate),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_hashrate', 'hashRate', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_gasPrice: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_gasPrice),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_gasPrice', 'gasPrice', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_accounts: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_accounts),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_accounts', 'accts', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_blockNumber: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_blockNumber),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_blockNumber', 'blockNum', httpUrl, wssUrl);
    },
    args: [],
  },
  eth_getBalance: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getBalance),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getBalance',
        'balance',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getStorageAt: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getStorageAt),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getStorageAt',
        'storage',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim, trim],
  },
  eth_getTransactionCount: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getTransactionCount),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getTransactionCount',
        'txCount',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getBlockTransactionCountByHash: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getBlockTransactionCountByHash),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getBlockTransactionCountByHash',
        'txCount',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get transaction count from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
    ],
    parseArgs: [trim],
  },
  eth_getBlockTransactionCountByNumber: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getBlockTransactionCountByNumber),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getBlockTransactionCountByNumber',
        'txCount',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hex of a block to get transaction count from',
        placeholder: 'i.e. 0x9C6EFE',
      },
    ],
    parseArgs: [trim],
  },
  eth_getUncleCountByBlockHash: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getUncleCountByBlockHash),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getUncleCountByBlockHash',
        'uncleCount',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a block to get uncle count from',
        placeholder: 'i.e. 0x16c4e370736...',
      },
    ],
    parseArgs: [trim],
  },
  eth_getUncleCountByBlockNumber: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getUncleCountByBlockNumber),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getUncleCountByBlockNumber',
        'uncleCount',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hex of a block to get uncle count from',
        placeholder: 'i.e. 0x9C6EFE',
      },
    ],
    parseArgs: [trim],
  },
  eth_getCode: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getCode),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate('eth_getCode', 'code', httpUrl, wssUrl, ...args);
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
          'Integer block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
    parseArgs: [trim, trim],
  },
  eth_sign: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_sign),
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_signTransaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_signTransaction),
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_sendTransaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_sendTransaction),
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_sendRawTransaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_sendRawTransaction),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_sendRawTransaction',
        'tx',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim],
  },
  eth_call: {
    exec: getAxiosJsonRpcEthCallCaller(),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcEthCallTemplate('trace', httpUrl, wssUrl, ...args);
    },
    args: [
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
        validate: (value: string) =>
          utils.isHexString(value) || isBlockNumberConstant(value),
      },
      {
        type: 'textarea',
        description:
          'address: (optional) The address the transaction is sent from',
        placeholder: 'i.e. 0x19624ffa41f...',
        validate: (value: string) => !value || utils.isAddress(value),
      },
      {
        type: 'textfield',
        description:
          'value: (optional) Integer formatted as a hex string of the value sent with this transaction',
        placeholder: 'i.e. 0x19624ffa41f...',
        validate: (value: string) => !value || utils.isHexString(value),
      },
      {
        type: 'textarea',
        description: 'Address of contract',
        placeholder: 'i.e. 0x91b51c173a4...',
        validate: utils.isAddress,
      },
      {
        type: 'textfield',
        description:
          'String of the hash of the method signature and encoded parameters',
        placeholder: `i.e. 0x70a0823100000...`,
        validate: (value: string) => !value || utils.isHexString(value),
      },
      {
        type: 'textfield',
        description:
          'gas: (optional) Hex of the gas provided for the transaction execution.',
        placeholder: `i.e. 10`,
      },
      {
        type: 'textfield',
        description:
          'gasPrice: (optional) Hex of the gasPrice used for each paid gas encoded as a hexadecimal.',
        placeholder: `i.e. 20`,
      },
    ],
    parseArgs: new Array(7).fill(trim),
  },
  eth_estimateGas: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_estimateGas),
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_getBlockByHash: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getBlockByHash),
    codeSample: (httpUrl, wssUrl, arg1, arg2) => {
      return JsonRpcTemplate(
        'eth_getBlockByHash',
        'blockData',
        httpUrl,
        wssUrl,
        arg1,
        !!arg2,
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
    parseArgs: [trim, (value = '') => !!value],
  },
  eth_getBlockByNumber: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getBlockByNumber),
    codeSample: (httpUrl, wssUrl, arg1, arg2) => {
      return JsonRpcTemplate(
        'eth_getBlockByNumber',
        'blockData',
        httpUrl,
        wssUrl,
        arg1,
        !!arg2,
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
    parseArgs: [trim, (value = '') => !!value],
  },
  eth_getTransactionByHash: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getTransactionByHash),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getTransactionByHash',
        'txInfo',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim],
  },
  eth_getTransactionByBlockHashAndIndex: {
    exec: getAxiosJsonRpcCaller(
      EVMMethod.eth_getTransactionByBlockHashAndIndex,
    ),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getTransactionByBlockHashAndIndex',
        'txInfo',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getTransactionByBlockNumberAndIndex: {
    exec: getAxiosJsonRpcCaller(
      EVMMethod.eth_getTransactionByBlockNumberAndIndex,
    ),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getTransactionByBlockNumberAndIndex',
        'txInfo',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getTransactionReceipt: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getTransactionReceipt),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getTransactionReceipt',
        'txReceipt',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim],
  },
  eth_getUncleByBlockHashAndIndex: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getUncleByBlockHashAndIndex),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getUncleByBlockHashAndIndex',
        'blockUncle',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getUncleByBlockNumberAndIndex: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getUncleByBlockNumberAndIndex),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getUncleByBlockNumberAndIndex',
        'blockUncle',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  eth_getCompilers: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getCompilers),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_getCompilers',
        'compilers',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [],
  },
  eth_compileSolidity: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_compileSolidity),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_compileSolidity',
        'compiledCode',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim],
  },
  eth_compileSerpent: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_compileSerpent),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'eth_compileSerpent',
        'compiledCode',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'The source code you wish to compile.',
        placeholder: 'i.e. /* some serpent */',
      },
    ],
    parseArgs: [trim],
  },
  eth_newFilter: {
    exec: getAxiosJsonRpcEthNewFilterCaller(),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcEthNewFilterTemplate(httpUrl, wssUrl, ...args);
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
    parseArgs: [trim, trim, trim, getFilterTags],
  },
  eth_newBlockFilter: {
    exec: getAxiosJsonRpcEthNoArgFilterCaller(EVMMethod.eth_newBlockFilter),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcEthNoArgFilterTemplate(
        EVMMethod.eth_newBlockFilter,
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_newPendingTransactionFilter: {
    exec: getAxiosJsonRpcEthNoArgFilterCaller(
      EVMMethod.eth_newPendingTransactionFilter,
    ),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcEthNoArgFilterTemplate(
        EVMMethod.eth_newPendingTransactionFilter,
        httpUrl,
        wssUrl,
      );
    },
    args: [],
  },
  eth_uninstallFilter: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_uninstallFilter),
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  eth_getFilterChanges: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getFilterChanges),
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getFilterLogs: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getFilterLogs),
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getLogs: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getLogs),
    codeSample: () => {
      return '/* This method was covered via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
    },
    args: [],
  },
  eth_getWork: {
    exec: getAxiosJsonRpcCaller(EVMMethod.eth_getWork),
    codeSample: (httpUrl, wssUrl) => {
      return JsonRpcTemplate('eth_getWork', 'work', httpUrl, wssUrl);
    },
    args: [],
  },
  trace_block: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_block),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate('trace_block', 'trace', httpUrl, wssUrl, ...args);
    },
    args: [
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
    parseArgs: [trim],
  },
  trace_transaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_transaction),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'trace_transaction',
        'trace',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim],
  },
  trace_get: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_get),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate('trace_get', 'trace', httpUrl, wssUrl, ...args);
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
    parseArgs: [trim, trim],
  },
  trace_rawTransaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_rawTransaction),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'trace_rawTransaction',
        'trace',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  trace_replayBlockTransactions: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_replayBlockTransactions),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'trace_replayBlockTransactions',
        'trace',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  trace_replayTransaction: {
    exec: getAxiosJsonRpcCaller(EVMMethod.trace_replayTransaction),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTemplate(
        'trace_replayTransaction',
        'trace',
        httpUrl,
        wssUrl,
        ...args,
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
    parseArgs: [trim, trim],
  },
  trace_filter: {
    exec: getAxiosJsonRpcTraceFilterCaller(),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTraceFilterTemplate(
        'trace_filter',
        'trace',
        httpUrl,
        wssUrl,
        ...args,
      );
    },
    args: [
      {
        type: 'textfield',
        description:
          'fromBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0xA37D49',
      },
      {
        type: 'textfield',
        description:
          'toBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0xA37E63',
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
        description: 'after: (optional) The offset trace number as an integer.',
        placeholder: 'i.e. 1000',
      },
      {
        type: 'textfield',
        description:
          'count: (optional) The number of traces to display in a batch as an integer.',
        placeholder: 'i.e. 10',
      },
    ],
    parseArgs: new Array(6).fill(trim),
  },
  trace_call: {
    exec: getAxiosJsonRpcTraceCallCaller(),
    codeSample: (httpUrl, wssUrl, ...args) => {
      return JsonRpcTraceCallTemplate('trace', httpUrl, wssUrl, ...args);
    },
    args: [
      {
        type: 'dropdown',
        description:
          'Type of trace, one or more of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace, trace',
        options: [
          {
            label: TraceType.VM_TRACE,
            value: TraceType.VM_TRACE,
          },
          {
            label: TraceType.TRACE,
            value: TraceType.TRACE,
          },
          {
            label: TraceType.STATE_DIFF,
            value: TraceType.STATE_DIFF,
          },
        ],
      },
      {
        type: 'textfield',
        description:
          'Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
        validate: (value: string) =>
          utils.isHexString(value) || isBlockNumberConstant(value),
      },
      {
        type: 'textarea',
        description:
          'address: (optional) The address the transaction is sent from',
        placeholder: 'i.e. 0x19624ffa41f...',
        validate: (value: string) => !value || utils.isAddress(value),
      },
      {
        type: 'textfield',
        description:
          'value: (optional) Integer formatted as a hex string of the value sent with this transaction',
        placeholder: 'i.e. 0x19624ffa41f...',
        validate: (value: string) => !value || utils.isHexString(value),
      },
      {
        type: 'textarea',
        description: 'Address of contract',
        placeholder: 'i.e. 0x91b51c173a4...',
        validate: utils.isAddress,
      },
      {
        type: 'textfield',
        description:
          'String of the hash of the method signature and encoded parameters',
        placeholder: `i.e. 0x70a0823100000...`,
        validate: (value: string) => !value || utils.isHexString(value),
      },
      {
        type: 'textfield',
        description:
          'gas: (optional) Hex of the gas provided for the transaction execution.',
        placeholder: `i.e. 10`,
      },
      {
        type: 'textfield',
        description:
          'gasPrice: (optional) Hex of the gasPrice used for each paid gas encoded as a hexadecimal.',
        placeholder: `i.e. 20`,
      },
    ],
    parseArgs: new Array(8).fill(trim),
  },
};
