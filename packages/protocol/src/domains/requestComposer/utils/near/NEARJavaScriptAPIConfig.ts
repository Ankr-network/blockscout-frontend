import json5 from 'json5';
import { Provider } from 'near-api-js/lib/providers';

import { composeValidators } from '../validators/composeValidators';
import { isEmptyString } from '../validators/isEmptyString';
import { isInputValueArray } from '../validators/isInputValueArray';
import { isInputValueBase64 } from '../validators/isInputValueBase64';
import { isInputValueObject } from '../validators/isInputValueObject';
import { isNearHash } from '../validators/isNearHash';
import { isNonNegativeInteger } from '../validators/isNonNegativeInteger';
import { isStringOfNull } from '../validators/isStringOfNull';
import { objectHasPairs } from '../validators/objectHasPairs';
import { addCommaToArg } from './helpers';

const NOT_SUPPORTED_METHOD = {
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
};

const NEARJavaScriptAPITemplate = (
  methodCall: string,
  varName: string,
  url: string,
  ...args: string[]
) => {
  return `import { connect, keyStores } from 'near-api-js';

const config = {
  networkId: 'mainnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store
  nodeUrl: '${url}',
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
}

(async () => {
  const nearConnection = await connect(config);

  const { provider } = nearConnection.connection;

  const ${varName} = await provider.${methodCall}(${args
    .map((arg, i) =>
      i !== args.length - 1 ? addCommaToArg(arg.trim()) : arg.trim(),
    )
    .join('')});

  console.log(${varName});
})();
`;
};

const NEARJavaScriptAPISendJsonRpcTemplate = (
  methodCall: string,
  varName: string,
  url: string,
  arg: string,
) => {
  return `import { connect, keyStores } from 'near-api-js';

const config = {
  networkId: 'mainnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(), // first create a key store
  nodeUrl: '${url}', 
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.mainnet.near.org',
}

(async () => {
  const nearConnection = await connect(config);

  const { provider } = nearConnection.connection;

  const ${varName} = await provider.sendJsonRpc('${methodCall}'${
    arg ? `, ${arg.trim()}` : ''
  });

  console.log(${varName});
})();
`;
};

export const NEARJavaScriptAPIConfig = {
  query: {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: 'RpcQueryRequest Object',
        placeholder: `i.e. {
          request_type: "view_access_key_list",
          finality: "final",
          account_id: "example.testnet",
        }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - view_access_key': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: 'view_access_key',
          finality OR block_id,
          account_id,
          public_key
        }
        `,
        placeholder: `i.e. {
          request_type: "view_access_key",
          finality: "final",
          account_id: "client.chainlink.testnet",
          public_key: "ed25519:H9k5eiU4xXS3M4z8HzKJSLaZdqGdGwBG49o7orNC4eZW"
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'view_access_key' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - view_access_key_list': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: "view_access_key_list",
          finality OR block_id,
          account_id
        }
        `,
        placeholder: `i.e. {
          request_type: "view_access_key_list",
          finality: "final",
          account_id: "example.testnet",
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'view_access_key_list' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  EXPERIMENTAL_changes: {
    exec: (
      provider: Provider,
      // @ts-ignore: the method is not typed by the lib
      ...args: Parameters<Provider['sendJsonRpc']>
    ) => {
      // @ts-ignore: the method is not typed by the lib
      return provider.sendJsonRpc('EXPERIMENTAL_changes', ...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPISendJsonRpcTemplate(
        'EXPERIMENTAL_changes',
        'response',
        httpUrl,
        arg.trim(),
      ),
    args: [
      {
        type: 'textarea',
        description: 'params object',
        placeholder: `i.e. {
            "changes_type": "contract_code_changes",
            "account_ids": ["dev-1602714453032-7566969"],
            "block_id": 75721095
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'EXPERIMENTAL_changes - single_access_key_changes': {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['singleAccessKeyChanges']>
    ) => {
      return provider.singleAccessKeyChanges(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'singleAccessKeyChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
        `${arg2.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'keys: [{ account_id, public_key }]',
        placeholder: `i.e. [
          {
            account_id: "example-acct.testnet",
            public_key: "ed25519:25KEc7t7MQohAJ4EDThd2vkksKkwangnuJFzcoiXj9oM",
          },
      ]`,
        validate: (value = '') => isInputValueArray(value),
      },
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'EXPERIMENTAL_changes - all_access_key_changes': {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['accessKeyChanges']>
    ) => {
      return provider.accessKeyChanges(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'accessKeyChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
        `${arg2.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'account_ids: [ "example.testnet", "example2.testnet"]',
        placeholder: `i.e. ["example-acct.testnet"]`,
        validate: (value = '') => isInputValueArray(value),
      },
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - view_account': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: "view_account",
          finality OR block_id,
          account_id
        }
        `,
        placeholder: `i.e. {
          request_type: "view_account",
          finality: "final",
          account_id: "example.testnet",
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'view_account' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'EXPERIMENTAL_changes - account_changes': {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['accountChanges']>
    ) => {
      return provider.accountChanges(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'accountChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
        `${arg2.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'account_ids: [ "example.testnet", "example2.testnet"]',
        placeholder: `i.e. ["example-acct.testnet"]`,
        validate: (value = '') => isInputValueArray(value),
      },
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - view_code': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: "view_code",
          finality OR block_id,
          account_id
        }
        `,
        placeholder: `i.e. {
          request_type: "view_code",
          finality: "final",
          account_id: "example.testnet",
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'view_code' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - view_state': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: "view_state",
          finality OR block_id,
          account_id,
          prefix_base64
        }
        `,
        placeholder: `i.e. {
          request_type: "view_state",
          finality: "final",
          account_id: "example.testnet",
          prefix_base64: ""
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'view_state' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'EXPERIMENTAL_changes - data_changes': {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['contractStateChanges']>
    ) => {
      return provider.contractStateChanges(...args);
    },
    codeSample: (
      httpUrl: string,
      wssUrl?: string,
      arg = '',
      arg2 = '',
      arg3 = '',
    ) =>
      NEARJavaScriptAPITemplate(
        'contractStateChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
        `${arg2.trim()}`,
        `'${arg3.trim()}'`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'account_ids: [ "example.testnet", "example2.testnet"]',
        placeholder: `i.e. ["example-acct.testnet"]`,
        validate: (value = '') => isInputValueArray(value),
      },
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
      {
        type: 'textarea',
        description: 'base64 encoded key value',
        placeholder: `i.e. QW5rciB3YXMgaGVyZQ==`,
        validate: (value = '') => isInputValueBase64(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
      (value = '') => value,
    ],
  },

  'EXPERIMENTAL_changes - contract_code_changes': {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['contractCodeChanges']>
    ) => {
      return provider.contractCodeChanges(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'contractCodeChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
        `${arg2.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'account_ids: [ "example.testnet", "example2.testnet"]',
        placeholder: `i.e. ["example-acct.testnet"]`,
        validate: (value = '') => isInputValueArray(value),
      },
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  'query - call_function': {
    exec: (provider: Provider, ...args: Parameters<Provider['query']>) => {
      return provider.query(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('query', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: `
        {
          request_type: "call_function",
          finality OR block_id,
          account_id,
          method_name,
          args_base64
        }
        `,
        placeholder: `i.e. {
          request_type: "call_function",
          finality: "final",
          account_id: "example.testnet",
          method_name: "get_num",
          args_base64: "e30="
        }`,
        validate: (value = '') =>
          isInputValueObject(value) &&
          objectHasPairs(value, { request_type: 'call_function' }),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  block: {
    exec: (provider: Provider, ...args: Parameters<Provider['block']>) => {
      return provider.block(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate('block', 'response', httpUrl, `${arg.trim()}`),
    args: [
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  EXPERIMENTAL_changes_in_block: {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['blockChanges']>
    ) => {
      return provider.blockChanges(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate(
        'blockChanges',
        'response',
        httpUrl,
        `${arg.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description: '{ finality } OR { blockId }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  chunk: {
    exec: (provider: Provider, ...args: Parameters<Provider['chunk']>) => {
      return provider.chunk(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate(
        'chunk',
        'response',
        httpUrl,
        isInputValueArray(arg) ? `${arg.trim()}` : `'${arg.trim()}'`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'Hash of a chunk ID or [blockId, shardId]',
        placeholder: `i.e. 2gBhmZThzeceDwd7PnqFbshjG8dBPMEvr8PPYQwU3zK2 or [75584357, 1]`,
        validate: (value = '') => isNearHash(value) || isInputValueArray(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isNearHash(value)) return value;
        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  gas_price: {
    exec: (provider: Provider, ...args: Parameters<Provider['gasPrice']>) => {
      return provider.gasPrice(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') => {
      arg = arg.trim();

      let argString: string;

      if (isEmptyString(arg) || isStringOfNull(arg)) {
        argString = 'null';
      } else if (isNonNegativeInteger(arg)) {
        argString = `${arg}`;
      } else {
        argString = `'${arg.trim()}'`;
      }

      return NEARJavaScriptAPITemplate(
        'gasPrice',
        'response',
        httpUrl,
        argString,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Block hash or height, or null for latest.',
        placeholder: 'i.e. C53kpenBdjT5iveKSZBXLacy23YHbaxr1pTPKrbDQEYQ',
        validate: composeValidators(
          isEmptyString,
          isStringOfNull,
          isNonNegativeInteger,
          isNearHash,
        ),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isEmptyString(value) || isStringOfNull(value)) return null;
        if (isNonNegativeInteger(value)) return +value;
        if (isNearHash(value)) return value;

        return value;
      },
    ],
  },

  EXPERIMENTAL_genesis_config: {
    exec: (
      provider: Provider,
      // @ts-ignore: the method is not typed by the lib
      ...args: Parameters<Provider['sendJsonRpc']>
    ) => {
      // @ts-ignore: the method is not typed by the lib
      return provider.sendJsonRpc('EXPERIMENTAL_genesis_config', ...args);
    },
    codeSample: (httpUrl: string) =>
      NEARJavaScriptAPISendJsonRpcTemplate(
        'EXPERIMENTAL_genesis_config',
        'response',
        httpUrl,
        '',
      ),
    args: [],
  },

  EXPERIMENTAL_protocol_config: {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['experimental_protocolConfig']>
    ) => {
      return provider.experimental_protocolConfig(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPITemplate(
        'experimental_protocolConfig',
        'response',
        httpUrl,
        `${arg.trim()}`,
      ),
    args: [
      {
        type: 'textarea',
        description:
          '{ finality } OR { blockId } OR { sync_checkpoint: "genesis" }',
        placeholder: `i.e. {
            blockId: "B6JbhucMcMKY7degNGvB3J6KunTgqZn978ewg7GD3nks"
          }`,
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  status: NOT_SUPPORTED_METHOD,

  network_info: NOT_SUPPORTED_METHOD,

  validators: {
    exec: (provider: Provider, ...args: Parameters<Provider['validators']>) => {
      return provider.validators(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') => {
      arg = arg.trim();

      let argString: string;

      if (isEmptyString(arg) || isStringOfNull(arg)) {
        argString = 'null';
      } else if (isNonNegativeInteger(arg)) {
        argString = `${arg}`;
      } else {
        argString = `'${arg}'`;
      }

      return NEARJavaScriptAPITemplate(
        'validators',
        'response',
        httpUrl,
        argString,
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Block hash or height, or null for latest.',
        placeholder: 'i.e. 2gBhmZThzeceDwd7PnqFbshjG8dBPMEvr8PPYQwU3zK2',
        validate: composeValidators(
          isEmptyString,
          isStringOfNull,
          isNonNegativeInteger,
          isNearHash,
        ),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isEmptyString(value) || isStringOfNull(value)) return null;
        if (isNonNegativeInteger(value)) return +value;
        if (isNearHash(value)) return value;

        return value;
      },
    ],
  },

  broadcast_tx_async: {
    exec: (
      provider: Provider,
      // @ts-ignore: the method is not typed by the lib
      ...args: Parameters<Provider['sendJsonRpc']>
    ) => {
      // @ts-ignore: the method is not typed by the lib
      return provider.sendJsonRpc('broadcast_tx_async', ...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPISendJsonRpcTemplate(
        'broadcast_tx_async',
        'response',
        httpUrl,
        arg.trim(),
      ),
    args: [
      {
        type: 'textarea',
        description: '[SignedTransaction encoded in base64]',
        placeholder:
          'i.e. ["DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="]',
        validate: (value = '') => isInputValueArray(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  broadcast_tx_commit: {
    exec: (
      provider: Provider,
      // @ts-ignore: the method is not typed by the lib
      ...args: Parameters<Provider['sendJsonRpc']>
    ) => {
      // @ts-ignore: the method is not typed by the lib
      return provider.sendJsonRpc('broadcast_tx_commit', ...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPISendJsonRpcTemplate(
        'broadcast_tx_commit',
        'response',
        httpUrl,
        arg.trim(),
      ),
    args: [
      {
        type: 'textarea',
        description: '[SignedTransaction encoded in base64]',
        placeholder:
          'i.e. ["DgAAAHNlbmRlci50ZXN0bmV0AOrmAai64SZOv9e/naX4W15pJx0GAap35wTT1T/DwcbbDwAAAAAAAAAQAAAAcmVjZWl2ZXIudGVzdG5ldNMnL7URB1cxPOu3G8jTqlEwlcasagIbKlAJlF5ywVFLAQAAAAMAAACh7czOG8LTAAAAAAAAAGQcOG03xVSFQFjoagOb4NBBqWhERnnz45LY4+52JgZhm1iQKz7qAdPByrGFDQhQ2Mfga8RlbysuQ8D8LlA6bQE="]',
        validate: (value = '') => isInputValueArray(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueArray(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  tx: {
    exec: (provider: Provider, ...args: Parameters<Provider['txStatus']>) => {
      return provider.txStatus(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'txStatus',
        'response',
        httpUrl,
        `'${arg.trim()}'`,
        `'${arg2.trim()}'`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'transaction hash',
        placeholder: 'i.e. 4iRwuPGHm5XAFB36QCP1j9Byw9GhwcLgnvcQahTKzBXV',
        validate: (value = '') => isNearHash(value),
      },
      {
        type: 'textarea',
        description: 'hash of the NEAR account that signed the transaction',
        placeholder: 'i.e. sender.testnet',
      },
    ],
    parseArgs: [(value = '') => value.trim(), (value = '') => value.trim()],
  },

  EXPERIMENTAL_tx_status: {
    exec: (
      provider: Provider,
      ...args: Parameters<Provider['txStatusReceipts']>
    ) => {
      return provider.txStatusReceipts(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '', arg2 = '') =>
      NEARJavaScriptAPITemplate(
        'txStatusReceipts',
        'response',
        httpUrl,
        `'${arg.trim()}'`,
        `'${arg2.trim()}'`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'transaction hash',
        placeholder: 'i.e. 4iRwuPGHm5XAFB36QCP1j9Byw9GhwcLgnvcQahTKzBXV',
        validate: (value = '') => isNearHash(value),
      },
      {
        type: 'textarea',
        description: 'hash of the NEAR account that signed the transaction',
        placeholder: 'i.e. bowen',
      },
    ],
    parseArgs: [(value = '') => value.trim(), (value = '') => value.trim()],
  },

  EXPERIMENTAL_receipt: {
    exec: (
      provider: Provider,
      // @ts-ignore: the method is not typed by the lib
      ...args: Parameters<Provider['sendJsonRpc']>
    ) => {
      // @ts-ignore: the method is not typed by the lib
      return provider.sendJsonRpc('EXPERIMENTAL_receipt', ...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, arg = '') =>
      NEARJavaScriptAPISendJsonRpcTemplate(
        'EXPERIMENTAL_receipt',
        'response',
        httpUrl,
        arg.trim(),
      ),
    args: [
      {
        type: 'textarea',
        description: '{ receipt_id }',
        placeholder:
          'i.e. { receipt_id: "2EbembRPJhREPtmHCrGv3Xtdm3xoc5BMVYHm3b2kjvMY" }',
        validate: (value = '') => isInputValueObject(value),
      },
    ],
    parseArgs: [
      (value = '') => {
        value = value.trim();

        if (isInputValueObject(value)) return json5.parse(value);

        return value;
      },
    ],
  },

  EXPERIMENTAL_light_client_proof: NOT_SUPPORTED_METHOD,
};
