import { FetchBlockchainUrlsResult } from './types';
import { IBlockchainEntity } from '../backoffice';
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

export const parseJwtToken = (token = '') => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (error) {
    return null;
  }
};