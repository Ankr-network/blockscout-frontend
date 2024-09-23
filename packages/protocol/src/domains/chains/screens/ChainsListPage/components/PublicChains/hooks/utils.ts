import BigNumber from 'bignumber.js';
import { ChainID, ESortChainsType, Chain } from '@ankr.com/chains-list';

import { extractCustomizedChains } from 'domains/chains/components/ChainsList/ChainsListUtils';

import { SortPublicChainsParams } from '../PublicChainsTypes';

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const CHAIN_IDS_BY_USAGE = [
  ChainID.POLYGON,
  ChainID.AVALANCHE,
  ChainID.ETH,
  ChainID.BSC,
  ChainID.FANTOM,
  ChainID.ARBITRUM,
  ChainID.OPTIMISM,
  ChainID.CELO,
  ChainID.SOLANA,
  ChainID.GNOSIS,
  ChainID.TRON,
  ChainID.FILECOIN,
  ChainID.POLYGON_ZKEVM,
  ChainID.IOTEX,
  ChainID.HARMONY,
  ChainID.APTOS,
  ChainID.MOONBEAM,
  ChainID.KLAYTN,
  ChainID.ZKSYNC_ERA,
  ChainID.SUI,
  ChainID.NEAR,
  ChainID.BTTC,
  ChainID.ARBITRUM_NOVA,
  ChainID.SYSCOIN,
  ChainID.TENET,
  ChainID.BASE,
  ChainID.METIS,
  ChainID.MANTLE,
  ChainID.HECO,
  ChainID.SECRET,
  ChainID.NERVOS,
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

const getSorter = (sortType: ESortChainsType, isLoading: boolean) => {
  if (sortType === ESortChainsType.UsageHighLow) {
    if (isLoading) {
      return chainsUsageSorter;
    }

    return publicChainsSorter;
  }

  return () => 0;
};

export const sortPublicChains = ({
  chains: rawChains = [],
  isLoading,
  sortType,
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
    const { id } = item;

    return {
      ...item,
      totalRequests: new BigNumber(data?.[id] || 0),
    };
  });
};
