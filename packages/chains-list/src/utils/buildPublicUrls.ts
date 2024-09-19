import {
  ALLORA_IDS,
  APTOS_IDS,
  ENABLED_SECRET_NETWORK_IDS,
  ENABLED_ZETACHAIN_IDS,
  KAVA_IDS,
  SEI_IDS,
  STELLAR_IDS,
  blockchainNameTemplate,
} from '../constants';
import { ChainsConfig, EBlockchainFeature, IBlockchainEntity } from '../common';

const buildRpcUrl = (rpcUrl: string, path: string) => {
  return rpcUrl.replace(blockchainNameTemplate, path);
};

const buildEnterpriseRpcUrl = (enterpriseRpcUrl: string, path: string) => {
  return enterpriseRpcUrl.replace(blockchainNameTemplate, path);
};

export interface IBuildPublicUrlsProps {
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
}: IBuildPublicUrlsProps) => {
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
    const blockchainCopy = { ...blockchain }; // Create a shallow copy of the blockchain object

    if (id === 'avalanche') {
      blockchainCopy.paths = avalancheEvmItem?.paths || [];
    }

    if (
      id === 'tron' ||
      id === 'gnosis_beacon' ||
      ALLORA_IDS.includes(id) ||
      id === 'btc_blockbook'
    ) {
      blockchainCopy.paths = blockchain?.paths ? [blockchain.paths[0]] : [];
    }

    if (APTOS_IDS.includes(id)) {
      blockchainCopy.paths = blockchain?.paths
        ? [`${blockchain.paths[0]}/v1`]
        : [];
    }

    if (ENABLED_SECRET_NETWORK_IDS.includes(id)) {
      const secretItem = secretItemsMap[id];

      blockchainCopy.paths = secretItem?.paths ? [secretItem.paths[0]] : [];
    }

    if (ENABLED_ZETACHAIN_IDS.includes(id)) {
      const zetaChainItem = zetaChainItemsMap[id];

      blockchainCopy.paths = zetaChainItem?.paths
        ? [zetaChainItem.paths[0]]
        : [];
    }

    if (
      SEI_IDS.includes(id) ||
      STELLAR_IDS.includes(id) ||
      KAVA_IDS.includes(id)
    ) {
      blockchainCopy.paths = blockchain.paths?.[0] ? [blockchain.paths[0]] : [];
    }

    const hasRPC =
      blockchain.features.includes(EBlockchainFeature.RPC) ||
      blockchain.features.includes(EBlockchainFeature.ComingSoon) ||
      blockchain.features.includes(EBlockchainFeature.GRPC);

    const rpcURLs: string[] = hasRPC
      ? blockchainCopy?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) ||
        []
      : [];

    const enterpriseURLs: string[] =
      blockchainCopy?.paths?.map(path =>
        buildEnterpriseRpcUrl(publicEnterpriseRpcUrl, path),
      ) || [];

    const enterpriseWsURLs: string[] =
      blockchainCopy?.paths?.map(path =>
        buildEnterpriseRpcUrl(enterpriseWsUrl, path),
      ) || [];

    const hasREST = blockchain.features.includes(EBlockchainFeature.REST);

    const restURLs = hasREST
      ? blockchainCopy?.paths?.map(path => buildRpcUrl(publicRpcUrl, path)) ||
        []
      : [];

    result[id] = {
      blockchain: blockchainCopy,
      rpcURLs,
      wsURLs: [],
      restURLs,
      enterpriseURLs,
      enterpriseWsURLs,
    };

    return result;
  }, {});
};
