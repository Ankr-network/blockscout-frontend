import { SortType } from '../ChainsSortSelect/ChainsSortSelectUtils';
import { ChainsListProps, Chain } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['data']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const {
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

export const sortChains = (data: Chain[], sortType: SortType): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  if (sortType === SortType.Usage) {
    return [...data].sort(
      (a, b) =>
        (b?.totalRequests?.toNumber() || 0) -
        (a?.totalRequests?.toNumber() || 0),
    );
  }

  return data;
};
