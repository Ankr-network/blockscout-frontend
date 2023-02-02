import BigNumber from 'bignumber.js';

import { IApiChain } from 'domains/chains/api/queryChains';
import { Chain, SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import {
  extractCustomizedChains,
  formatChains,
} from 'domains/chains/components/ChainsList/ChainsListUtils';
import { SortPublicChainsParams } from '../PublicChainsTypes';

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const CHAIN_IDS_BY_USAGE = [
  ChainID.POLYGON,
  ChainID.FANTOM,
  ChainID.BSC,
  ChainID.ETH,
  ChainID.AVALANCHE,
  ChainID.SOLANA,
  ChainID.ARBITRUM,
  ChainID.OPTIMISM,
  ChainID.GNOSIS,
  ChainID.CELO,
  ChainID.MOONBEAM,
  ChainID.HARMONY,
  ChainID.TRON,
  ChainID.IOTEX,
  ChainID.NEAR,
  ChainID.APTOS,
  ChainID.BTTC,
  ChainID.FILECOIN,
  ChainID.SYSCOIN,
  ChainID.KLAYTN,
  ChainID.HECO,
  ChainID.NERVOS,
  ChainID.METIS,
  ChainID.POLKADOT,
  ChainID.KUSAMA,
  ChainID.SECRET,
];

const getSorter = (sortType: SortType, isLoading: boolean) => {
  if (sortType === SortType.Usage) {
    if (isLoading) {
      return (a: Chain, b: Chain) => {
        if (
          CHAIN_IDS_BY_USAGE.indexOf(a?.id) === -1 ||
          CHAIN_IDS_BY_USAGE.indexOf(b?.id) === -1
        ) {
          return 1;
        }

        return (
          CHAIN_IDS_BY_USAGE.indexOf(a?.id) - CHAIN_IDS_BY_USAGE.indexOf(b?.id)
        );
      };
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
  chains: IApiChain[],
  data?: Record<ChainID, string>,
) => {
  return formatChains(
    chains.map(item => {
      const { id, frontChain: { id: frontChainId } = {} } = item;

      return {
        ...item,
        totalRequests: new BigNumber(data?.[frontChainId ?? id] ?? 0),
      };
    }),
  );
};
