import { ChainsListProps, Chain } from './ChainsListTypes';

export const PERIOD = '24h';

export const formatChains = (
  data: ChainsListProps['data'],
  hasCredentials: boolean,
): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const { id, icon, name, rpcUrl, wsUrl, requests } = item;
    const rpcLinks = hasCredentials ? [rpcUrl, wsUrl] : [rpcUrl];

    return {
      id,
      icon,
      name,
      rpcLinks,
      requests,
    };
  });
};
