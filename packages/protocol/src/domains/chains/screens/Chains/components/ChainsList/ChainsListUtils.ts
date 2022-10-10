import { BlockchainType } from 'multirpc-sdk';

import { Chain, ChainsListProps, SortChainsParams } from './ChainsListTypes';
import { SortType } from 'domains/chains/types';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      extenders,
      extensions,
      icon,
      id,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
    } = item;

    return {
      coinName,
      extenders,
      extensions,
      icon,
      id,
      isArchive,
      name,
      totalRequests,
      type,
      urls,
    };
  });
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

export const sortChains = ({
  chains: rawChains = [],
  isWalletConnected,
  sortType,
  stats,
}: SortChainsParams): Chain[] => {
  if (!Array.isArray(rawChains)) return [];

  const [chains, customizedChains] = extractCustomizedChains(rawChains);

  const privateChainsSorter = (a: Chain, b: Chain) =>
    (stats[b.id]?.total_requests || 0) - (stats[a.id]?.total_requests || 0);

  const usageSorter = isWalletConnected
    ? privateChainsSorter
    : publicChainsSorter;

  const sorter = sortType === SortType.Usage ? usageSorter : () => 0;

  const sortedChains = [...chains].sort(sorter);

  return [...customizedChains, ...sortedChains];
};
