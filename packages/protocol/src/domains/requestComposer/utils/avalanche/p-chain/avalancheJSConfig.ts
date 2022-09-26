/* eslint-disable prefer-promise-reject-errors */
import BN from 'bn.js';

import { ILibraryConfig } from 'domains/requestComposer/types/avalanche';
import { PChainMethod } from 'domains/requestComposer/constants/avalanche';

const avalancheJSTemplate = (
  methodCall: string,
  url: string,
  params = '',
  library = '',
) => {
  return `import { Avalanche } from 'avalanche';
${library}${library && '\n'}
(async () => {
  const platform = new Avalanche().PChain();
  platform.setBaseURL('${url}');

  const response = await platform.${methodCall}(${params});

  console.log(response);
})();
`;
};

export const avalancheJSConfig: ILibraryConfig<PChainMethod> = {
  'platform.addDelegator': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'addDelegator',
        httpUrl,
        `{
          nodeID: string,
          startTime: int,
          endTime: int,
          stakeAmount: int,
          rewardAddress: string,
          from: []string, // optional
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.addValidator': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'addValidator',
        httpUrl,
        `{
          nodeID: string,
          startTime: int,
          endTime: int,
          stakeAmount: int,
          rewardAddress: string,
          delegationFeeRate: float,
          from: []string, // optional
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.addSubnetValidator': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'addSubnetValidator',
        httpUrl,
        `{
          nodeID: string,
          subnetID: string,
          startTime: int,
          endTime: int,
          weight: int,
          from: []string, // optional
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.createAddress': {
    exec: () => new Promise((resolve, reject) => reject('Not Supported')),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createAddress',
        httpUrl,
        `{
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.createBlockchain': {
    exec: () => new Promise((resolve, reject) => reject('Not Supported')),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createBlockchain',
        httpUrl,
        `{
          subnetID: string,
          vmID: string,
          name: string,
          genesisData: string,
          encoding: string, // optional
          from: []string, // optional
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.createSubnet': {
    exec: () => new Promise((resolve, reject) => reject('Not Supported')),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'createSubnet',
        httpUrl,
        `{
          controlKeys: []string,
          threshold: int,
          from: []string, // optional
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.exportAVAX': {
    exec: () => new Promise((resolve, reject) => reject('Not Supported')),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'exportAVAX',
        httpUrl,
        `{
          amount: int,
          from: []string, // optional
          to: string,
          changeAddr: string, // optional
          username: string,
          password: string
        }`,
      ),
    args: [],
  },
  'platform.exportKey': {
    exec: () => new Promise((resolve, reject) => reject('Not Supported')),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate(
        'exportKey',
        httpUrl,
        `{
          username: string,
          password: string,
          address: string
        }`,
      ),
    args: [],
  },
  'platform.getBalance': {
    exec: (provider, address) => {
      return provider.getBalance(address);
    },
    codeSample: (httpUrl: string, _wssUrl?: string, address?: string) =>
      avalancheJSTemplate('getBalance', httpUrl, `'${address}'`),
    args: [
      {
        type: 'textarea',
        description: 'The address to get the balance of',
        placeholder: 'i.e. P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5',
      },
    ],
  },
  'platform.getBlockchains': {
    exec: provider => {
      return provider.getBlockchains();
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getBlockchains', httpUrl),
    args: [],
  },
  'platform.getBlockchainStatus': {
    exec: (provider, blockchainID) => {
      return provider.getBlockchainStatus(blockchainID);
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getBlockchainStatus', httpUrl),
    args: [
      {
        type: 'textarea',
        description: 'blockchain ID',
        placeholder: 'i.e. 2NbS4dwGaf2p1MaXb65PrkZdXRwmSX4ZzGnUu7jm3aykgThuZE',
      },
    ],
  },
  'platform.getCurrentSupply': {
    exec: provider => {
      return provider.getCurrentSupply();
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getCurrentSupply', httpUrl),
    args: [],
  },
  'platform.getCurrentValidators': {
    exec: (provider, subnetID?: string, nodeIDs?: string) => {
      return provider.getCurrentValidators(subnetID, nodeIDs?.split(', '));
    },
    codeSample: (httpUrl: string, wssUrl?: string, ...rest) =>
      avalancheJSTemplate(
        'getCurrentValidators',
        httpUrl,
        rest.map(item => `'${item}'`).join(', '),
      ),
    args: [
      {
        type: 'textarea',
        description: 'The Subnet whose current validators are returned',
        placeholder: 'i.e. 11111111111111111111111111111111LpoYY',
      },
      {
        type: 'textfield',
        description: 'A list of the nodeIDs of current validators to request',
        placeholder:
          'i.e. NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg, NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg',
      },
    ],
  },
  'platform.getHeight': {
    exec: provider => {
      return provider.getHeight();
    },
    codeSample: (httpUrl: string) => avalancheJSTemplate('getHeight', httpUrl),
    args: [],
  },
  'platform.getMaxStakeAmount': {
    exec: (provider, subnetID, nodeID, startTime = '', endTime = '') => {
      return provider.getMaxStakeAmount(
        subnetID,
        nodeID,
        new BN(startTime),
        new BN(endTime),
      );
    },
    codeSample: (
      httpUrl: string,
      wssUrl?: string,
      subnetID?: string,
      nodeID?: string,
      ...rest
    ) =>
      avalancheJSTemplate(
        'getMaxStakeAmount',
        httpUrl,
        `'${subnetID}', '${nodeID}', ${rest
          .map(item => `new BN(${item})`)
          .join(', ')}`,
        `import BN from 'bn.js'`,
      ),
    args: [
      {
        type: 'textfield',
        description: 'subnetID. A Buffer or cb58 string representing Subnet',
        placeholder: 'i.e. 11111111111111111111111111111111LpoYY',
      },
      {
        type: 'textfield',
        description:
          'nodeID. A string representing ID of the node whose stake amount is required during the given duration',
        placeholder: 'i.e. NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg',
      },
      {
        type: 'textfield',
        description:
          'startTime. A big number denoting start time of the duration during which stake amount of the node is required',
        placeholder: 'i.e. 1644240334',
      },
      {
        type: 'textfield',
        description:
          'endTime. A big number denoting end time of the duration during which stake amount of the node is required',
        placeholder: 'i.e. 1644240634',
      },
    ],
  },
  'platform.getMinStake': {
    exec: provider => {
      return provider.getMinStake();
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getMinStake', httpUrl),
    args: [],
  },
  'platform.getPendingValidators': {
    exec: (provider, subnetID, nodeIDs) => {
      return provider.getPendingValidators(
        subnetID,
        nodeIDs?.split(', ')?.filter(Boolean),
      );
    },
    codeSample: (httpUrl: string, wssUrl, subnetID, ...rest) =>
      avalancheJSTemplate(
        'getPendingValidators',
        httpUrl,
        `'${subnetID}', [${rest.map(item => `'${item}'`)}]`,
      ),
    args: [
      {
        type: 'textfield',
        description: 'subnetID. A Subnet whose current validators are returned',
        placeholder: 'i.e. 11111111111111111111111111111111LpoYY',
      },
      {
        type: 'textfield',
        description:
          'nodeIDs. a list of the nodeIDs of pending validators to request',
        placeholder:
          'i.e. NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg, NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg',
      },
    ],
  },
  'platform.getRewardUTXOs': {
    exec: (provider, ...rest) => {
      return provider.getRewardUTXOs(...rest);
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getRewardUTXOs',

        httpUrl,
        `${rest.map(item => `'${item}'`).join(', ')}`,
      ),
    args: [
      {
        type: 'textfield',
        description: 'txID. The ID of the staking or delegating transaction',
        placeholder: 'i.e. 2nmH8LithVbdjaXsxVQCQfXtzN9hBbmebrsaEYnLM9T32Uy2Y5',
      },
      {
        type: 'textfield',
        description:
          'encoding. Specifies the format for the returned UTXOs. Can only be hex when a value is provided.',
        placeholder: 'i.e. hex',
      },
    ],
  },
  'platform.getStakingAssetID': {
    exec: (provider, ...rest) => {
      return provider.getStakingAssetID(...rest);
    },
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getStakingAssetID', httpUrl),
    args: [],
  },
  'platform.getSubnets': {
    exec: (provider, IDs) => {
      return provider.getSubnets(IDs ? IDs?.split(', ') : []);
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getSubnets',

        httpUrl,
        `[${rest.map(item => `'${item}'`)}]`,
      ),
    args: [
      {
        type: 'textarea',
        description:
          'ids. The IDs of the Subnets to get information about. If omitted, gets information about all Subnets.',
        placeholder: 'i.e. hW8Ma7dLMA7o4xmJf3AXBbo17bXzE7xnThUd3ypM4VAWo1sNJ',
      },
    ],
  },
  'platform.getStake': {
    exec: (provider, IDs) => {
      return provider.getStake(IDs?.split(', '));
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getStake',

        httpUrl,
        `[${rest.map(item => `'${item}'`)}]`,
      ),
    args: [
      {
        type: 'textarea',
        description: 'addresses. The addresses to get information about.',
        placeholder: 'i.e. P-avax1pmgmagjcljjzuz2ve339dx82khm7q8getlegte',
      },
    ],
  },
  'platform.getTimestamp': {
    exec: provider => provider.getTimestamp(),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getTimestamp', httpUrl),
    args: [],
  },
  'platform.getTotalStake': {
    exec: provider => provider.getTotalStake(),
    codeSample: (httpUrl: string) =>
      avalancheJSTemplate('getTotalStake', httpUrl),
    args: [],
  },
  'platform.getTx': {
    exec: (provider, ...rest) => {
      return provider.getTx(...rest);
    },
    codeSample: (httpUrl: string, wssUrl, ...rest) =>
      avalancheJSTemplate(
        'getTx',
        httpUrl,
        `${rest.map(item => `'${item}'`).join(', ')}`,
      ),
    args: [
      {
        type: 'textfield',
        description: 'txID. The ID of the transaction',
        placeholder: 'i.e. 2Eug3Y6j1yD745y5bQ9bFCf5nvU2qT1eB53GSpD15EkGUfu8xh',
      },
      {
        type: 'textfield',
        description: 'encoding. Specifies the format for the returned txID',
        placeholder: 'i.e. json',
      },
    ],
  },
  'platform.getTxStatus': {
    exec: (provider, ...rest) => {
      return provider.getTxStatus(...rest);
    },
    codeSample: (httpUrl: string, wssUrl, txID) =>
      avalancheJSTemplate('getTxStatus', httpUrl, `'${txID}'`),
    args: [
      {
        type: 'textarea',
        description: 'txID. The ID of the transaction',
        placeholder: 'i.e. TAG9Ns1sa723mZy1GSoGqWipK6Mvpaj7CAswVJGM6MkVJDF9Q',
      },
    ],
  },
  'platform.getUTXOs': {
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
        description: 'addresses. The addresses to get information about.',
        placeholder:
          'i.e. P-avax18jma8ppw3nhx5r4ap8clazz0dps7rv5ukulre5, P-avax1d09qn852zcy03sfc9hay2llmn9hsgnw4tp3dv6',
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
    ],
  },
  'platform.getValidatorsAt': {
    exec: (provider, height, subnetID) => {
      return provider.getValidatorsAt(Number(height), subnetID || undefined);
    },
    codeSample: (httpUrl: string, wssUrl, height, subnetID) =>
      avalancheJSTemplate(
        'getValidatorsAt',
        httpUrl,
        `${height || 0}, '${subnetID}'`,
      ),
    args: [
      {
        type: 'textfield',
        description: 'height. The P-Chain height to get the validator set at',
        placeholder: 'i.e. 5',
      },
      {
        type: 'textfield',
        description:
          'subnetID (Optional). The Subnet ID to get the validator set of. If not given, gets validator set of the Primary Network.',
        placeholder: 'i.e. 11111111111111111111111111111111LpoYY',
      },
    ],
  },
  'platform.importAVAX': {
    exec: () => {
      return new Promise((resolve, reject) => reject('Not Supported'));
    },
    codeSample: httpUrl => {
      return avalancheJSTemplate(
        'importAVAX',
        httpUrl,
        `username: string,
         password: string,
         to: string,
         sourceChain: string`,
      );
    },
    args: [],
  },
  'platform.importKey': {
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
  'platform.issueTx': {
    exec: (provider, ...args) => {
      return provider.issueTx(...args);
    },
    codeSample: (httpUrl: string, wssUrl?: string, txID?: string) =>
      avalancheJSTemplate('issueTx', 'response', httpUrl, `'${txID}'`),
    args: [
      {
        type: 'textarea',
        description: 'tx. the byte representation of a transaction',
        placeholder:
          'i.e. 0x00000009de31b4d8b22991d51aa6aa1fc733f23a851a8c9400000000000186a0000000005f041280000000005f9ca900000030390000000000000001fceda8f90fcb5d30614b99d79fc4baa29307762668f16eb0259a57c2d3b78c875c86ec2045792d4df2d926c40f829196e0bb97ee697af71f5b0a966dabff749634c8b729855e937715b0e44303fd1014daedc752006011b730',
      },
    ],
  },
  'platform.listAddresses': {
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
  'platform.sampleValidators': {
    exec: (provider, size = 0, subnetID) => {
      return provider.sampleValidators(size, subnetID || undefined);
    },
    codeSample: (httpUrl: string, size?: string, subnetID?: string) => {
      return avalancheJSTemplate(
        'sampleValidators',
        httpUrl,
        `${size || 0}, '${subnetID}'`,
      );
    },
    args: [
      {
        type: 'textfield',
        description: 'size. The number of validators to sample.',
        placeholder: 'i.e. 2',
      },
      {
        type: 'textfield',
        description:
          'subnetID. The Subnet to sampled from. If omitted, defaults to the Primary Network',
        placeholder: 'i.e. 11111111111111111111111111111111LpoYY',
      },
    ],
  },
  'platform.validatedBy': {
    exec: (provider, blockchainID) => {
      return provider.validatedBy(blockchainID);
    },
    codeSample: (httpUrl: string, wssUrl, blockchainID: string) => {
      return avalancheJSTemplate('validatedBy', httpUrl, `'${blockchainID}'`);
    },
    args: [
      {
        type: 'textfield',
        description: 'Blockchain’s ID',
        placeholder: 'i.e. KDYHHKjM4yTJTT8H8qPs5KXzE6gQH5TZrmP1qVr1P6qECj3XN',
      },
    ],
  },
  'platform.validates': {
    exec: (provider, subnetID) => {
      return provider.validates(subnetID);
    },
    codeSample: (httpUrl: string, wssUrl, subnetID: string) => {
      return avalancheJSTemplate('validates', httpUrl, `'${subnetID}'`);
    },
    args: [
      {
        type: 'textfield',
        description: 'Subnet’s ID',
        placeholder: 'i.e. 2bRCr6B4MiEfSjidDwxDpdCyviwnfUVqB2HGwhm947w9YYqb7r',
      },
    ],
  },
};
