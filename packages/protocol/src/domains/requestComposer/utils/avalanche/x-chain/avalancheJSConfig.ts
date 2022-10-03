/* eslint-disable prefer-promise-reject-errors */
import { ILibraryConfig } from 'domains/requestComposer/types/avalanche';
import { XChainMethod } from 'domains/requestComposer/constants/avalanche';

const avalancheJSTemplate = (
  methodCall: string,
  url: string,
  params = '',
  library = '',
) => {
  return `import { Avalanche } from 'avalanche';
${library}${library && '\n'}
(async () => {
  const avm = new Avalanche().XChain();
  avm.setBaseURL('${url}');

  const response = await avm.${methodCall}(${params});

  console.log(response);
})();
`;
};

export const avalancheJSConfig: ILibraryConfig<XChainMethod> = {
  'avm.buildGenesis': {
    exec: (provider, genesisData) => {
      return provider.buildGenesis(JSON.stringify(genesisData));
    },
    codeSample: (httpUrl: string, wssUrl, genesisData) =>
      avalancheJSTemplate('genesisData', httpUrl, `'${genesisData}'`),
    args: [],
  },
  'avm.createAddress': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createAddress',
        httpUrl,
        `username: string,
         password: string
        `,
      ),
    args: [],
  },
  'avm.createFixedCapAsset': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createFixedCapAsset',
        httpUrl,
        `username: string,
         password: string,
         name: string,
         symbol: string,
         denomination: int, //optional
         initialHolders: []{
           address: string,
           amount: int
          `,
      ),
    args: [],
  },
  'avm.mint': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'mint',
        httpUrl,
        `username: string,
         password: string,
         amount: int,
         assetID: string,
         to: string,
         minters: string[]
        `,
      ),
    args: [],
  },
  'avm.createVariableCapAsset': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createVariableCapAsset',
        httpUrl,
        `username: string,
         password: string,
         name: string,
         symbol: string,
         denomination: number,
         minterSets: object[]
        `,
      ),
    args: [],
  },
  'avm.createNFTAsset': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createNFTAsset',
        httpUrl,
        `username: string,
         password: string,
         from: string[] | Buffer[],
         changeAddr: string,
         name: string,
         symbol: string,
         minterSet: IMinterSet`,
      ),
    args: [],
  },
  'avm.mintNFT': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'mintNFT',
        httpUrl,
        `username: string,
         password: string,
         from: string[] | Buffer[],
         changeAddr: string,
         payload: string,
         assetID: string | Buffer,
         to: string,
         encoding?: string`,
      ),
    args: [],
  },
  'avm.export': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'export',
        httpUrl,
        `username: string,
         password: string,
         to: string,
         amount: BN,
         assetID: string`,
      ),
    args: [],
  },
  'avm.exportKey': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'exportKey',
        httpUrl,
        `username: string,
         password: string,
         address: string`,
      ),
    args: [],
  },
  'avm.getAllBalances': {
    exec: (provider, address) => {
      return provider.getAllBalances(address);
    },
    codeSample: (httpUrl: string, wssUrl, address) =>
      avalancheJSTemplate('getAllBalances', httpUrl, `'${address}'`),
    args: [
      {
        type: 'textarea',
        description: 'Address you want to fetch balances for',
        placeholder: 'i.e. X-avax1c79e0dd0susp7dc8udq34jgk2yvve7hapvdyht',
      },
    ],
  },
  'avm.getAssetDescription': {
    exec: (provider, assetID) => {
      return provider.getAssetDescription(assetID);
    },
    codeSample: (httpUrl: string, wssUrl, assetID) =>
      avalancheJSTemplate('getAssetDescription', httpUrl, `'${assetID}'`),
    args: [
      {
        type: 'textarea',
        description:
          'The id of the asset for which the information is requested',
        placeholder: 'i.e. FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z',
      },
    ],
  },
  'avm.getBalance': {
    exec: (provider, address, assetID, includePartial) => {
      return provider.getBalance(
        address || undefined,
        assetID || undefined,
        includePartial || undefined,
      );
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getBalance',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      ),
    args: [
      {
        type: 'textarea',
        description: 'Owner of the asset',
        placeholder: 'i.e. X-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5',
      },
      {
        type: 'textfield',
        description: 'Id of the asset for which the balance is requested',
        placeholder: 'i.e. 2pYGetDWyKdHxpFxh2LHeoLNCH6H5vxxCxHQtFnnFaYxLsqtHC',
      },
      {
        type: 'boolean',
        description:
          'Should the returned balance include assets held only partially by the address?',
      },
    ],
  },
  'avm.getAddressTxs': {
    exec: (provider, address, cursor, assetID, pageSize) => {
      return provider.getAddressTxs(
        address || undefined,
        cursor || undefined,
        pageSize || 1024,
        assetID || undefined,
      );
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getAddressTxs',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      ),
    args: [
      {
        type: 'textarea',
        description:
          "The address for which we're fetching related transactions",
        placeholder: 'i.e. X-local1kpprmfpzzm5lxyene32f6lr7j0aj7gxsu6hp9y',
      },
      {
        type: 'textfield',
        description:
          'The page number or offset. Leave empty to get the first page.',
        placeholder: 'i.e. 1',
      },
      {
        type: 'textfield',
        description:
          'Only return transactions that changed the balance of this asset. Must be an ID or an alias for an asset.',
        placeholder: 'i.e. AVAX',
      },
      {
        type: 'textfield',
        description:
          'Number of items to return per page. Optional. Defaults to 1024.',
        placeholder: 'i.e. 1024',
      },
    ],
  },
  'avm.getTx': {
    exec: (provider, txID, encoding) => {
      return provider.getTx(txID, encoding || undefined);
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getTx',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      ),
    args: [
      {
        type: 'textarea',
        description: 'Transaction Id',
        placeholder: 'i.e. KMcVWV1dJAuWQXfrJgNFFr9uPHqXELQNZoFWoosYVqQV5qGj5',
      },
      {
        type: 'textfield',
        description: 'Encoding format (hex or json)',
        placeholder: 'i.e. json',
      },
    ],
  },
  'avm.getTxStatus': {
    exec: (provider, txID) => {
      return provider.getTxStatus(txID);
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getTx',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      ),
    args: [
      {
        type: 'textarea',
        description: 'Transaction Id',
        placeholder: 'i.e. KMcVWV1dJAuWQXfrJgNFFr9uPHqXELQNZoFWoosYVqQV5qGj5',
      },
    ],
  },
  'avm.getUTXOs': {
    exec: (provider, addresses: string, sourceChain, limit, ...rest) => {
      return provider.getUTXOs(
        addresses ? addresses?.split(', ') : [],
        sourceChain || undefined,
        limit || undefined,
        ...rest,
      );
    },
    codeSample: (httpUrl: string, wssUrl, addresses: string, ...rest) =>
      avalancheJSTemplate(
        'getUTXOs',
        httpUrl,
        `[${addresses?.split(', ')?.map(item => `'${item}'`)}], ${rest
          .map(item => `'${item}'`)
          .join(', ')}`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'The addresses to get information about.',
        placeholder:
          'i.e. P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5, P-avax1d09qn852zcy03sfc9hay2llmn9hsgnw4tp3dv6',
      },
      {
        type: 'textfield',
        description:
          'A string for the chain to look for the UTXOs. Current chain is used by default, but if the exported UTXOs exist in other chains, they can be used instead.',
        placeholder: 'i.e. X',
      },
      {
        type: 'textfield',
        description:
          'Returns at most [limit] addresses. If [limit] == 0 or > [maxUTXOsToFetch], fetches up to [maxUTXOsToFetch]',
        placeholder: 'i.e. 5',
      },
    ],
  },
  'avm.import': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'import',
        httpUrl,
        `username: string,
         password: string,
         to: string,
         sourceChain: string`,
      ),
    args: [],
  },
  'avm.importKey': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'importKey',
        httpUrl,
        `username: string,
         password: string,
         privateKey:string`,
      );
    },
    args: [],
  },
  'avm.issueTx': {
    exec: (provider, ...args) => {
      return provider.issueTx(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, txID?: string) =>
      avalancheJSTemplate('issueTx', httpUrl, `'${txID}'`),
    args: [
      {
        type: 'textarea',
        description: 'The byte representation of a transaction',
        placeholder:
          'i.e. 0x00000009de31b4d8b22991d51aa6aa1fc733f23a851a8c9400000000000186a0000000005f041280000000005f9ca900000030390000000000000001fceda8f90fcb5d30614b99d79fc4baa29307762668f16eb0259a57c2d3b78c875c86ec2045792d4df2d926c40f829196e0bb97ee697af71f5b0a966dabff749634c8b729855e937715b0e44303fd1014daedc752006011b730',
      },
    ],
  },
  'avm.listAddresses': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'listAddresses',
        httpUrl,
        `username: string,
         password: string`,
      );
    },
    args: [],
  },
  'avm.send': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'send',
        httpUrl,
        `username: string,
         password: string,
         assetID: string | Buffer,
         amount: number | BN,
         to: string,
         from?: string[] | Buffer[],
         changeAddr?: string,
         memo?: string | Buffer`,
      );
    },
    args: [],
  },
  'avm.sendMultiple': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'sendMultiple',
        httpUrl,
        `username: string,
         password: string,
         sendOutputs: {
           assetID: string | Buffer;
           amount: number | BN;
           to: string;
         }[],
         from?: string[] | Buffer[],
         changeAddr?: string,
         memo?: string | Buffer`,
      );
    },
    args: [],
  },
  'avm.sendNFT': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'sendNFT',
        httpUrl,
        `username: string,
         password: string,
         from: string[] | Buffer[],
         changeAddr: string,
         assetID: string | Buffer,
         groupID: number,
         to: string`,
      );
    },
    args: [],
  },
};
