import { ChainsConfig } from './types';
import { IBlockchainEntity, BlockchainFeature } from '../../common';
import {
  APTOS_IDS,
  ENABLED_SECRET_NETWORK_IDS,
  ENABLED_ZETACHAIN_IDS,
  blockchainNameTemplate,
} from './constants';

const buildRpcUrl = (rpcUrl: string, path: string) => {
  return rpcUrl.replace(blockchainNameTemplate, path);
};

export const buildPublicUrls = (
  blockchainsApiResponse: IBlockchainEntity[],
  publicRpcUrl: string,
) => {
  const avalancheEvmItem = blockchainsApiResponse.find(
    item => item.id === 'avalanche-evm',
  );

  const blockchains = blockchainsApiResponse.filter(
    item => item.id !== 'avalanche-evm',
  );

  const secretItemsMap = blockchainsApiResponse.reduce<
    Partial<Record<string, IBlockchainEntity>>
  >((map, item) => {
    if (ENABLED_SECRET_NETWORK_IDS.includes(item.id)) {
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

  return blockchains.reduce<ChainsConfig>((result, blockchain) => {
    const { id } = blockchain;

    if (id === 'avalanche') {
      blockchain.paths = avalancheEvmItem?.paths ?? [];
    }

    if (id === 'tron' || id === 'gnosis_beacon') {
      blockchain.paths = blockchain?.paths ? [blockchain.paths[0]] : [];
    }

    if (APTOS_IDS.includes(id)) {
      blockchain.paths = blockchain?.paths ? [`${blockchain.paths[0]}/v1`] : [];
    }

    if (ENABLED_SECRET_NETWORK_IDS.includes(id)) {
      const secretItem = secretItemsMap[id];

      blockchain.paths = secretItem?.paths ? [secretItem.paths[0]] : [];
    }

    if (ENABLED_ZETACHAIN_IDS.includes(id)) {
      const zetaChainItem = zetaChainItemsMap[id];

      blockchain.paths = zetaChainItem?.paths ? [zetaChainItem.paths[0]] : [];
    }

    const hasRPC =
      blockchain.features.includes(BlockchainFeature.RPC) ||
      blockchain.features.includes(BlockchainFeature.ComingSoon);

    const rpcURLs: string[] = hasRPC
      ? blockchain?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) || []
      : [];

    const hasREST = blockchain.features.includes(BlockchainFeature.REST);

    const restURLs = hasREST
      ? blockchain?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) || []
      : [];

    result[id] = { blockchain, rpcURLs, wsURLs: [], restURLs };

    return result;
  }, {});
};
