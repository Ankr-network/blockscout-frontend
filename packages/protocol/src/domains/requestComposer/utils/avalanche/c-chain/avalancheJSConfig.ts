/* eslint-disable prefer-promise-reject-errors */
import { CChainMethod } from 'domains/requestComposer/constants/avalanche';
import { ILibraryConfig } from 'domains/requestComposer/types/avalanche';

const avalancheJSTemplate = (
  methodCall: string,
  varName: string,
  url: string,
  txID?: string,
) => {
  return `import { Avalanche } from 'avalanche';

(async () => {
  const avax = new Avalanche().CChain();
  avax.setBaseURL('${url}');

  const ${varName} = await avax.${methodCall}(${txID});
  console.log(${varName});
})();
`;
};

export const avalancheJSConfig: ILibraryConfig<CChainMethod> = {
  'avax.getAtomicTx': {
    exec: (provider, ...args) => {
      return provider.getAtomicTx(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, txID?: string) =>
      avalancheJSTemplate('getAtomicTx', 'response', httpUrl, `'${txID}'`),
    args: [
      {
        type: 'textarea',
        description: 'Transaction ID in cb58 format.',
        placeholder: 'i.e. 2GD5SRYJQr2kw5jE73trBFiAgVQyrCaeg223TaTyJFYXf2kPty',
      },
    ],
  },
  'avax.export': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.exportAVAX': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.exportKey': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.getUTXOs': {
    exec: (provider, ...args) => {
      const [address, ...others] = args;

      const parsedAddresses = address?.split(', ');

      return provider.getUTXOs(
        parsedAddresses,
        ...others?.map(item => item || undefined),
      );
    },
    codeSample: (httpUrl: string, wssUrl?: string, ...rest) => {
      return avalancheJSTemplate(
        'getUTXOs',
        'response',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'An address or a list of addresses in cb58 format.',
        placeholder:
          'i.e. C-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5, C-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5',
      },
      {
        type: 'textfield',
        description:
          'sourceChain. A string for the chain to look for the UTXOs. Current chain is used by default, but if the exported UTXOs exist in other chains, they can be used instead.',
        placeholder: 'i.e. X',
      },
      {
        type: 'textfield',
        description:
          'limit (Optional). Returns at most [limit] addresses. If [limit] == 0 or > [maxUTXOsToFetch], fetches up to [maxUTXOsToFetch]',
        placeholder: 'i.e. 5',
      },
      {
        type: 'textfield',
        description:
          'startIndex (Optional). [StartIndex] defines where to start fetching UTXOs (for pagination.)',
        placeholder: 'i.e. 0',
      },
      {
        type: 'textfield',
        description:
          'encoding. Sets the format for the returned UTXOs. Can only be hex when a value is provided.',
        placeholder: 'i.e. hex',
      },
    ],
  },
  'avax.import': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.importAVAX': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.importKey': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: () => {
      return '/* Not Supported */';
    },
    args: [],
  },
  'avax.issueTx': {
    exec: (provider, ...args) => {
      return provider.issueTx(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, txID?: string) =>
      avalancheJSTemplate('issueTx', 'response', httpUrl, `'${txID}'`),
    args: [
      {
        type: 'textarea',
        description: 'A string representing a transaction.',
        placeholder: 'i.e. 0x...',
      },
    ],
  },
  'avax.getAtomicTxStatus': {
    exec: (provider, ...args) => {
      return provider.getAtomicTxStatus(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, txID?: string) =>
      avalancheJSTemplate(
        'getAtomicTxStatus',
        'response',
        httpUrl,
        `'${txID}'`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'The string representation of the transaction ID.',
        placeholder: 'i.e. 2GD5SRYJQr2kw5jE73trBFiAgVQyrCaeg223TaTyJFYXf2kPty',
      },
    ],
  },
};
