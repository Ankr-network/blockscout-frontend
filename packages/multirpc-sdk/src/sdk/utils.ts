import { FetchBlockchainUrlsResult } from './types';
import { BlockchainFeature, IBlockchainEntity } from '../backoffice';
import { IConfig } from '../common';

const ENABLED_SECRET_NETWORK_IDS = new Set<string>([
  'scrt-cosmos-grpc-web',
  'scrt-cosmos-rest',
  'scrt-rest',
]);

const ENABLED_ZETACHAIN_IDS = [
  'zetachain-tendermint-rest-testnet',
  'zetachain-cosmos-rest-testnet',
];

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

  const zetaChainItemsMap = blockchainsApiResponse.reduce<
    Partial<Record<string, IBlockchainEntity>>
  >((map, item) => {
    if (ENABLED_ZETACHAIN_IDS.includes(item.id)) {
      map[item.id] = item;
    }

    return map;
  }, {});

  return blockchains.reduce<FetchBlockchainUrlsResult>((result, blockchain) => {
    const hasRPC =
      blockchain.features.includes(BlockchainFeature.RPC) ||
      blockchain.features.includes(BlockchainFeature.ComingSoon);

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

    if (ENABLED_ZETACHAIN_IDS.includes(blockchain.id)) {
      const zetaChainItem = zetaChainItemsMap[blockchain.id];

      blockchain.paths = zetaChainItem?.paths ? [zetaChainItem.paths[0]] : [];
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
  const isZetaChain = ENABLED_ZETACHAIN_IDS.includes(blockchain.id);

  let paths = blockchain?.paths ?? [];

  if (isTron || isAptos || isAptosTestnet || isEnabledSecret || isZetaChain) {
    paths = blockchain?.paths ? [blockchain.paths[1]] : [];
  }

  return paths;
};

export const formatPrivateUrls = (
  blockchains: IBlockchainEntity[],
  config: IConfig,
  tokenHash = '',
) => {
  return [...blockchains].reduce<FetchBlockchainUrlsResult>(
    (result, blockchain) => {
      const hasRPC =
        blockchain.features.includes(BlockchainFeature.RPC) ||
        blockchain.features.includes(BlockchainFeature.ComingSoon);
      const hasWS = blockchain.features.includes(BlockchainFeature.WS);

      const paths = getPaths(blockchain);
      const isAptos =
        blockchain.id === 'aptos' || blockchain.id === 'aptos_testnet';

      const rpcURLs: string[] = hasRPC
        ? paths.map(path => {
            const { privateRpcUrl } = config;
            let url = privateRpcUrl
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
            const { privateWsUrl } = config;

            let url = privateWsUrl
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
    },
    {},
  );
};

export const parseJwtToken = (token = '') => {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch (error) {
    return null;
  }
};
