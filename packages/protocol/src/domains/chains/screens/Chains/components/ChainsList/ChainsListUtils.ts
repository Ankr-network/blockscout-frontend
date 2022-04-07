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
      requests,
      totalRequest,
      urls,
    } = item;

    return {
      icon,
      id,
      isArchive,
      extenders,
      extensions,
      name,
      requests,
      totalRequest,
      urls,
    };
  });
};
