import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { IApiChain } from 'domains/chains/api/queryChains';

export const formatChain = (data?: IApiChain): Chain | null => {
  if (!data) return null;

  const { id, icon, name, rpcUrl, wsUrl, requests } = data;
  const rpcLinks = wsUrl ? [rpcUrl, wsUrl] : [rpcUrl];

  return {
    id,
    icon,
    name,
    rpcLinks,
    requests,
  };
};

const { REACT_APP_IS_BUILD_FOR_ERIGON_WITH_HOMEPAGE } = process.env;

export const getLink = (chainId: string): string => {
  const link = window?.location.origin || '';

  if (chainId === 'erigonbsc' && REACT_APP_IS_BUILD_FOR_ERIGON_WITH_HOMEPAGE) {
    return `${link}/${chainId}`;
  }

  return link;
};
