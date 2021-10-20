import { ChainsListProps, Chain } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (data: ChainsListProps['data']): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const { id, icon, name, rpcUrl, wsUrl, requests } = item;

    return {
      id,
      icon,
      name,
      rpcLinks: [rpcUrl, wsUrl],
      requests,
    };
  });
};
