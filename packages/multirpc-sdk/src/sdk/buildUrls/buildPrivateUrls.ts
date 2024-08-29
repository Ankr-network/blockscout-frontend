import { ChainsConfig } from './types';
import { BlockchainFeature, IBlockchainEntity } from '../../common';
import {
  APTOS_IDS,
  ENABLED_KAVA_IDS,
  ENABLED_SECRET_NETWORK_IDS,
  ENABLED_ZETACHAIN_IDS,
  SEI_IDS,
  STELLAR_IDS,
  blockchainNameTemplate,
  userNameTemplate,
} from './constants';

const shouldUsePremiumHttpUrl = (id: string) => {
  const isTron = id === 'tron';
  const isAptos = id === 'aptos';
  const isAptosTestnet = id === 'aptos_testnet';
  const isGnosisBeacon = id === 'gnosis_beacon';
  const isEthBeacon = id === 'eth_beacon';
  const isEthSepoliaBeacon = id === 'eth_sepolia_beacon';
  const isZetaChain = ENABLED_ZETACHAIN_IDS.includes(id);
  const isEnabledSecret = ENABLED_SECRET_NETWORK_IDS.includes(id);
  const isSei = SEI_IDS.includes(id);
  const isKava = ENABLED_KAVA_IDS.includes(id);
  const isStellar = STELLAR_IDS.includes(id);
  const isAlloraTestnet = id === 'allora_testnet-rest';
  const isBlockbook = id === 'btc_blockbook';

  return (
    isTron ||
    isAptos ||
    isAptosTestnet ||
    isEnabledSecret ||
    isGnosisBeacon ||
    isEthBeacon ||
    isEthSepoliaBeacon ||
    isZetaChain ||
    isSei ||
    isKava ||
    isStellar ||
    isAlloraTestnet ||
    isBlockbook
  );
};

const isBeacon = (id: string) => id.includes('beacon');

const getPaths = (blockchain: IBlockchainEntity) => {
  let paths = blockchain?.paths ?? [];

  if (shouldUsePremiumHttpUrl(blockchain.id)) {
    paths = blockchain?.paths ? [blockchain.paths[1]] : [];

    if (isBeacon(blockchain.id) && !blockchain.paths?.[1]) {
      paths = blockchain.paths?.[0] ? [blockchain.paths[0]] : [];
    }
  }

  return paths;
};

const buildRpcUrl = (
  privateRpcUrl: string,
  path: string,
  userEndpointToken: string,
) => {
  return privateRpcUrl
    .replace(blockchainNameTemplate, path)
    .replace(userNameTemplate, userEndpointToken);
};

const buildAptosUrl = (
  privateRpcUrl: string,
  path: string,
  userEndpointToken: string,
) => {
  const url = buildRpcUrl(privateRpcUrl, path, userEndpointToken);
  const lastPart = `${url.endsWith('/') ? '' : '/'}v1`;

  return `${url}${lastPart}`;
};

interface GetUrlsParams {
  paths: string[];
  privateUrl: string;
  userEndpointToken: string;
  isAptos: boolean;
}

const getUrls = ({
  paths,
  privateUrl,
  userEndpointToken,
  isAptos,
}: GetUrlsParams) => {
  return paths.map(path =>
    isAptos
      ? buildAptosUrl(privateUrl, path, userEndpointToken)
      : buildRpcUrl(privateUrl, path, userEndpointToken),
  );
};

interface BuildPrivateUrlsParams {
  blockchains: IBlockchainEntity[];
  privateRpcUrl: string;
  privateWsUrl: string;
  enterpriseRpcUrl: string;
  enterpriseWsUrl: string;
  userEndpointToken?: string;
}

export const buildPrivateUrls = ({
  blockchains,
  privateRpcUrl,
  privateWsUrl,
  enterpriseRpcUrl,
  enterpriseWsUrl,
  userEndpointToken = '',
}: BuildPrivateUrlsParams) => {
  return [...blockchains].reduce<ChainsConfig>((result, blockchain) => {
    const { id } = blockchain;
    const hasRPC =
      blockchain.features.includes(BlockchainFeature.RPC) ||
      blockchain.features.includes(BlockchainFeature.ComingSoon) ||
      blockchain.features.includes(BlockchainFeature.GRPC);
    const hasWS = blockchain.features.includes(BlockchainFeature.WS);

    const paths = getPaths(blockchain);

    const isAptos = APTOS_IDS.includes(id);

    const rpcURLs: string[] = hasRPC
      ? getUrls({
        paths,
        privateUrl: privateRpcUrl,
        userEndpointToken,
        isAptos,
      })
      : [];

    const wsURLs: string[] = hasWS
      ? getUrls({
        paths,
        privateUrl: privateWsUrl,
        userEndpointToken,
        isAptos,
      })
      : [];

    const hasREST = blockchain.features.includes(BlockchainFeature.REST);

    const restURLs: string[] = hasREST
      ? getUrls({
        paths,
        privateUrl: privateRpcUrl,
        userEndpointToken,
        isAptos,
      })
      : [];

    const enterpriseURLs: string[] = getUrls({
      paths,
      privateUrl: enterpriseRpcUrl,
      userEndpointToken,
      isAptos,
    });

    const enterpriseWsURLs: string[] = getUrls({
      paths,
      privateUrl: enterpriseWsUrl,
      userEndpointToken,
      isAptos,
    });

    result[id] = { blockchain, rpcURLs, wsURLs, restURLs, enterpriseURLs, enterpriseWsURLs };

    return result;
  }, {});
};
