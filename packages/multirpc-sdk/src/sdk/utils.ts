import * as ethUtil from 'ethereumjs-util';
import * as sigUtil from 'eth-sig-util';
import { Web3KeyWriteProvider } from '@ankr.com/provider-core';

import { BlockchainType, IBlockchainEntity } from '../backoffice';
import { FetchBlockchainUrlsResult } from './types';
import { IConfig, IJwtToken } from '../common';
import { JwtTokens } from '../consensus';

export const calcJwtTokenHash = async (
  jwtToken: IJwtToken,
): Promise<string> => {
  const secretToken = await crypto.subtle.digest(
    { name: 'SHA-256' },
    new TextEncoder().encode(jwtToken.signed_token),
  );

  const tokenBuffer = Buffer.from(new Uint8Array(secretToken));

  return tokenBuffer.toString('hex');
};

const ENABLED_SECRET_NETWORK_IDS = new Set<string>([
  'scrt-cosmos-grpc-web',
  'scrt-cosmos-rest',
  'scrt-rest',
]);

export const formatPublicUrls = (
  blockchainsApiResponse: IBlockchainEntity[],
  publicRpcUrl: string,
) => {
  const avalancheEvmItem = blockchainsApiResponse.find(
    item => item.id === 'avalanche-evm',
  );

  const blockchains = blockchainsApiResponse.filter(
    item => item.id !== 'avalanche-evm',
  );

  const tronItem = blockchainsApiResponse.find(item => item.id === 'tron');

  const aptosItem = blockchainsApiResponse.find(item => item.id === 'aptos');

  const aptosTestnetItem = blockchainsApiResponse.find(
    item => item.id === 'aptos_testnet',
  );

  const secretItemsMap = blockchainsApiResponse.reduce<
    Partial<Record<string, IBlockchainEntity>>
  >((map, item) => {
    if (ENABLED_SECRET_NETWORK_IDS.has(item.id)) {
      map[item.id] = item;
    }

    return map;
  }, {});

  return blockchains.reduce<FetchBlockchainUrlsResult>((result, blockchain) => {
    const hasRPC = blockchain.features.includes('rpc');

    if (blockchain.id === 'avalanche') {
      blockchain.paths = avalancheEvmItem?.paths ?? [];
    }

    if (blockchain.id === 'tron') {
      blockchain.paths = tronItem?.paths ? [tronItem.paths[0]] : [];
    }

    if (blockchain.id === 'aptos') {
      blockchain.paths = aptosItem?.paths ? [`${aptosItem.paths[0]}/v1`] : [];
    }

    if (blockchain.id === 'aptos_testnet') {
      blockchain.paths = aptosTestnetItem?.paths
        ? [`${aptosTestnetItem.paths[0]}/v1`]
        : [];
    }

    // temporary, to not break logics of handling other blockchains
    if (blockchain.id === 'sui_testnet') {
      blockchain.extends = undefined;
      blockchain.type = BlockchainType.Mainnet;
    }
    
    if (ENABLED_SECRET_NETWORK_IDS.has(blockchain.id)) {
      const secretItem = secretItemsMap[blockchain.id];

      blockchain.paths = secretItem?.paths ? [secretItem.paths[0]] : [];
    }

    const rpcURLs: string[] = hasRPC
      ? blockchain?.paths?.map(path =>
          publicRpcUrl.replace('{blockchain}', path),
        ) || []
      : [];
    const wsURLs: string[] = [];

    result[blockchain.id] = { blockchain, rpcURLs, wsURLs };

    return result;
  }, {});
};

const getPaths = (blockchain: IBlockchainEntity) => {
  const isTron = blockchain.id === 'tron';
  const isAptos = blockchain.id === 'aptos';
  const isAptosTestnet = blockchain.id === 'aptos_testnet';
  const isEnabledSecret = ENABLED_SECRET_NETWORK_IDS.has(blockchain.id);

  let paths = blockchain?.paths ?? [];

  if (isTron || isAptos || isAptosTestnet || isEnabledSecret) {
    paths = blockchain?.paths ? [blockchain.paths[1]] : [];
  }

  return paths;
};

export const formatPrivateUrls = (
  blockchains: IBlockchainEntity[],
  config: IConfig,
  tokenHash = '',
) => {
  return blockchains.reduce<FetchBlockchainUrlsResult>((result, blockchain) => {
    const hasRPC = blockchain.features.includes('rpc');
    const hasWS = blockchain.features.includes('ws');

    const paths = getPaths(blockchain);
    const isAptos =
      blockchain.id === 'aptos' || blockchain.id === 'aptos_testnet';

    // temporary, to not break logics of handling other blockchains
    if (blockchain.id === 'sui_testnet') {
      blockchain.extends = undefined;
      blockchain.type = BlockchainType.Mainnet;
    }

    const rpcURLs: string[] = hasRPC
      ? paths.map(path => {
          let url = config.privateRpcUrl
            .replace('{blockchain}', path)
            .replace('{user}', tokenHash);

          if (isAptos) {
            url += `${url.endsWith('/') ? '' : '/'}v1`;
          }

          return url;
        }) || []
      : [];

    const wsURLs: string[] = hasWS
      ? paths.map(path => {
          let url = config.privateWsUrl
            .replace('{blockchain}', path)
            .replace('{user}', tokenHash);

          if (isAptos) {
            url += `${url.endsWith('/') ? '' : '/'}v1`;
          }

          return url;
        }) || []
      : [];

    result[blockchain.id] = { blockchain, rpcURLs, wsURLs };

    return result;
  }, {});
};

export const catchSignError = async (error: any) => {
  // eslint-disable-next-line no-console
  console.error(error);

  const message = (error.message || error.error).substr(
    0,
    error.message.indexOf('\n'),
  );

  const parts = message.split(':');

  /* try to detect angry MetaMask messages */
  if (parts.length > 0) {
    /* special case for Firefox that doesn't return any errors, only extension stack trace */
    if (
      message.includes('@moz-extension') &&
      message.includes('Returned error: value')
    ) {
      throw new Error('User denied message signature');
    }

    /* cases for other browsers (tested in Chrome, Opera, Brave) */
    if (
      message.includes('MetaMask') ||
      message.includes('Returned error') ||
      message.includes('RPC Error')
    ) {
      throw new Error(parts[parts.length - 1]);
    }
  }

  throw error;
};

export const getFirstActiveToken = (tokens: JwtTokens) => {
  const [jwtTokens] = tokens;

  const sortedTokens = jwtTokens.sort(
    (a, b) => Number(a.expires_at) - Number(b.expires_at),
  );

  const firstActiveToken = sortedTokens.find(
    token => Number(token.expires_at) * 1000000 > Date.now(),
  );

  return firstActiveToken || sortedTokens[sortedTokens.length - 1];
};

const hashPersonalMessage = (msg: string): string => {
  const buffer = Buffer.from(msg);
  const result = ethUtil.hashPersonalMessage(buffer);
  const hash = ethUtil.bufferToHex(result);

  return hash;
};

const recoverPublicKey = (sig: string, hash: string): string => {
  const sigParams = ethUtil.fromRpcSig(sig);
  const hashBuffer = Buffer.from(hash.replace('0x', ''), 'hex');
  const result = ethUtil.ecrecover(
    hashBuffer,
    sigParams.v,
    sigParams.r,
    sigParams.s,
  );
  const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));

  return signer;
};

const recoverPersonalSignature = (sig: string, msg: string): string => {
  const hash = hashPersonalMessage(msg);
  const signer = recoverPublicKey(sig, hash);

  return signer;
};

const removeHexPrefix = (hex: string): string => {
  return hex.toLowerCase().replace('0x', '');
};

export const getEncryptionPublicKey = async (
  keyProvider: Web3KeyWriteProvider,
) => {
  const { currentAccount: address } = keyProvider;
  const { utils, eth } = keyProvider.getWeb3();

  const messageForPersonalSign = `DO NOT SIGN THIS MESSAGE IF YOU ARE NOT SURE THAT SIGN REQUEST CAME FROM ANKR. Your address ${address.toLowerCase()}`;

  // encode message (hex)
  const dataToSign = utils.utf8ToHex(messageForPersonalSign);

  const result = await eth.personal.sign(dataToSign, address, '');

  // verify signature
  const signer = recoverPersonalSignature(result, messageForPersonalSign);
  const isVerified = signer.toLowerCase() === address.toLowerCase();

  if (!isVerified) {
    throw new Error('The signer and the address are not the same');
  }

  let derivedPrivateKey = utils.sha3(result);

  if (derivedPrivateKey == null) {
    throw new Error('Failed to generate derived private key');
  }

  derivedPrivateKey = removeHexPrefix(derivedPrivateKey);

  const derivedEncryptionPublicKey =
    sigUtil.getEncryptionPublicKey(derivedPrivateKey);

  return {
    privateKey: derivedPrivateKey,
    publicKey: derivedEncryptionPublicKey,
  };
};

export const base64StrToUtf8String = (str: string) => {
  return Buffer.from(str, 'base64').toString('utf8');
};

export const REJECTED_OPERATION_CODE = 4001;
