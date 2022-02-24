import { fetchPublicChains } from 'domains/chains/actions/fetchPublicChains';
import { ResponseData } from 'modules/api/utils/ResponseData';

import { Chain } from './ChainItemHeaderTypes';

export const formatChains = (
  data: ResponseData<typeof fetchPublicChains>,
): Chain[] => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return data.map(item => {
    const { id, icon, name, rpcUrl, wsUrl, requests } = item;
    const rpcLinks = wsUrl ? [rpcUrl, wsUrl] : [rpcUrl];

    return {
      id,
      icon,
      name,
      rpcLinks,
      requests,
    };
  });
};
