import { SortType } from 'domains/chains/types';
import { Chain, ChainsListProps, SortChainsParams } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['chains']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
      coinName,
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      totalRequests,
      urls,
    } = item;

    return {
      coinName,
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      totalRequests,
      urls,
    };
  });
};

const publicChainsSorter = (a: Chain, b: Chain) =>
  (b?.totalRequests?.toNumber() || 0) - (a?.totalRequests?.toNumber() || 0);

export const sortChains = ({
  chains = [],
  isWalletConnected,
  sortType,
  stats,
}: SortChainsParams): Chain[] => {
  if (!Array.isArray(chains)) return [];

  const privateChainsSorter = (a: Chain, b: Chain) =>
    (stats[b.id]?.totalRequests || 0) - (stats[a.id]?.totalRequests || 0);

  if (sortType === SortType.Usage) {
    return [...chains].sort(
      isWalletConnected ? privateChainsSorter : publicChainsSorter,
    );
  }

  return chains;
};
