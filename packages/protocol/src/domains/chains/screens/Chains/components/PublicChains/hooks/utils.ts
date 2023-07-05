import BigNumber from 'bignumber.js';

import { ChainID, SortType, Chain } from 'domains/chains/types';
import { extractCustomizedChains } from 'domains/chains/components/ChainsList/ChainsListUtils';
import { SortPublicChainsParams } from '../PublicChainsTypes';

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const CHAIN_IDS_BY_USAGE = [
  ChainID.POLYGON,
  ChainID.BSC,
  ChainID.ETH,
  ChainID.FANTOM,
  ChainID.ARBITRUM,
  ChainID.AVALANCHE,
  ChainID.OPTIMISM,
  ChainID.GNOSIS,
  ChainID.CELO,
  ChainID.SOLANA,
  ChainID.TRON,
  ChainID.IOTEX,
  ChainID.POLYGON_ZKEVM,
  ChainID.FILECOIN,
  ChainID.HARMONY,
  ChainID.MOONBEAM,
  ChainID.KLAYTN,
  ChainID.APTOS,
  ChainID.BASE,
  ChainID.NEAR,
  ChainID.BTTC,
  ChainID.ARBITRUM_NOVA,
  ChainID.SYSCOIN,
  ChainID.METIS,
  ChainID.HECO,
  ChainID.NERVOS,
  ChainID.SECRET,
  ChainID.POLKADOT,
  ChainID.KUSAMA,
];

export const chainsUsageSorter = (a: Chain, b: Chain) => {
  if (
    CHAIN_IDS_BY_USAGE.indexOf(a?.id) === -1 ||
    CHAIN_IDS_BY_USAGE.indexOf(b?.id) === -1
  ) {
    return 1;
  }

  return CHAIN_IDS_BY_USAGE.indexOf(a?.id) - CHAIN_IDS_BY_USAGE.indexOf(b?.id);
};

const getSorter = (sortType: SortType, isLoading: boolean) => {
  if (sortType === SortType.Usage) {
    if (isLoading) {
      return chainsUsageSorter;
    }

    return publicChainsSorter;
  }

  return () => 0;
};

export const sortPublicChains = ({
  chains: rawChains = [],
  sortType,
  isLoading,
}: SortPublicChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const sortedChains = [...chains].sort(getSorter(sortType, isLoading));

  return [...customizedChains, ...sortedChains];
};

export const formatRequestsCount = (
  chains: Chain[],
  data?: Record<ChainID, string>,
) => {
  return chains.map(item => {
    const { id, chainWithoutMainnet: { id: frontChainId } = {} } = item;

    return {
      ...item,
      totalRequests: new BigNumber(data?.[frontChainId ?? id] ?? 0),
    };
  });
};

export const filteredByNameChains = (chains: Chain, searchContent: string) =>
  chains.name.toLocaleLowerCase().includes(searchContent.toLowerCase());
