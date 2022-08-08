import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { IApiChain } from 'domains/chains/api/queryChains';

export const formatChain = (data?: IApiChain): Chain | null => {
  if (!data) return null;

  const { id, icon, name, rpcUrls, wsUrls, requests } = data;
  const rpcLinks = [...rpcUrls, ...wsUrls];

  return {
    id,
    icon,
    name,
    rpcLinks,
    requests,
  };
};

export const getLink = (): string => {
  const link = window?.location.origin || '';

  return link;
};
