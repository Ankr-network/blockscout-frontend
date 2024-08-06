import { ChainsConfig } from './types';
import { IBlockchainEntity, BlockchainFeature } from '../../common';
import {
  APTOS_IDS,
  ENABLED_SECRET_NETWORK_IDS,
  ENABLED_ZETACHAIN_IDS,
  KAVA_IDS,
  SEI_IDS,
  STELLAR_IDS,
  blockchainNameTemplate,
} from './constants';

const buildRpcUrl = (rpcUrl: string, path: string) => {
  return rpcUrl.replace(blockchainNameTemplate, path);
};

const buildEnterpriseRpcUrl = (enterpriseRpcUrl: string, path: string) => {
  return enterpriseRpcUrl.replace(blockchainNameTemplate, path);
};

interface BuildPublicUrlsProps {
  blockchainsApiResponse: IBlockchainEntity[];
  publicRpcUrl: string;
  publicEnterpriseRpcUrl: string;
  enterpriseWsUrl: string;
}

// TODO: https://github.com/Ankr-network/mrpc-frontend/pull/3941#discussion_r1303911072
// make separate urlBuilders for MRPC and Enterprise
// https://ankrnetwork.atlassian.net/browse/MRPC-3691
export const buildPublicUrls = ({
  blockchainsApiResponse,
  publicRpcUrl,
  publicEnterpriseRpcUrl,
  enterpriseWsUrl,
}: BuildPublicUrlsProps) => {
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

    if (
      id === 'tron' || 
      id === 'gnosis_beacon' ||
      id === 'allora_testnet-rest'
    ) {
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

    if (SEI_IDS.includes(id) || STELLAR_IDS.includes(id) || KAVA_IDS.includes(id)) {
      blockchain.paths = blockchain.paths?.[0] ? [blockchain.paths[0]] : [];
    }

    const hasRPC =
      blockchain.features.includes(BlockchainFeature.RPC) ||
      blockchain.features.includes(BlockchainFeature.ComingSoon) ||
      blockchain.features.includes(BlockchainFeature.GRPC);

    const rpcURLs: string[] = hasRPC
      ? blockchain?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) || []
      : [];

    const enterpriseURLs: string[] =
      blockchain?.paths?.map(path =>
        buildEnterpriseRpcUrl(publicEnterpriseRpcUrl, path),
      ) || [];

    const enterpriseWsURLs: string[] =
      blockchain?.paths?.map(path =>
        buildEnterpriseRpcUrl(enterpriseWsUrl, path),
      ) || [];

    const hasREST = blockchain.features.includes(BlockchainFeature.REST);

    const restURLs = hasREST
      ? blockchain?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) || []
      : [];

    result[id] = {
      blockchain,
      rpcURLs,
      wsURLs: [],
      restURLs,
      enterpriseURLs,
      enterpriseWsURLs,
    };

    return result;
  }, {});
};
