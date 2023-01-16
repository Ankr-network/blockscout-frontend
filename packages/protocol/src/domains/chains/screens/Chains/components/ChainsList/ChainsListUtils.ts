import { BlockchainType } from 'multirpc-sdk';

import {
  Chain,
  ChainsListProps,
  SortPrivateChainsParams,
  SortPublicChainsParams,
} from './ChainsListTypes';
import { SortType } from 'domains/chains/types';
import { ChainID } from 'modules/chains/types';
import BigNumber from 'bignumber.js';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      extenders,
      extensions,
      frontChain = {},
      icon,
      id,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
      premiumOnly,
    } = item;

    return {
      coinName,
      extenders,
      extensions,
      frontChain,
      icon,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
      premiumOnly,
      ...frontChain,
      id,
    };
  });
};

export const formatPublicRequestsCount = (
  chains: ChainsListProps['chains'],
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

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

const extractCustomizedChains = (chains: Chain[]) =>
  chains.reduce<[Chain[], Chain[]]>(
    (acc, chain) => {
      if (chain.type === BlockchainType.Customized) {
        acc[1].push(chain);
      } else {
        acc[0].push(chain);
      }

      return acc;
    },
    [[], []],
  );

const getChainId = ({ id, frontChain: { id: frontChainId } = {} }: Chain) =>
  frontChainId || id;

export const sortPrivateChains = ({
  chains: rawChains = [],
  sortType,
  stats,
}: SortPrivateChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const privateChainsUsageSorter = (a: Chain, b: Chain) =>
    (stats[getChainId(b)]?.total_requests || 0) -
    (stats[getChainId(a)]?.total_requests || 0);

  const sorter =
    sortType === SortType.Usage ? privateChainsUsageSorter : () => 0;

  const sortedChains = [...chains].sort(sorter);

  return [...customizedChains, ...sortedChains];
};

const CHAIN_IDS_BY_USAGE = [
  ChainID.ETH,
  ChainID.BSC,
  ChainID.POLYGON,
  ChainID.FANTOM,
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
          return -1;
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
