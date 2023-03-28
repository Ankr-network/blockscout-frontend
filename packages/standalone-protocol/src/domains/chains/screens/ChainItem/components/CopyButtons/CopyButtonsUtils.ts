import { Chain } from '../ChainItemHeader/ChainItemHeaderTypes';
import { IApiChain } from 'domains/chains/api/queryChains';
import { IS_REACT_SNAP } from 'uiKit/NoReactSnap';
import { ChainId } from 'domains/chains/api/chain';

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

export const getLink = (chainId: ChainId): string => {
  const link = IS_REACT_SNAP ? '' : window?.location.origin;

  if (chainId === ChainId.POLYGON_ZKEVM) {
    return `${link}/${ChainId.POLYGON_ZKEVM}`;
  }

  return link;
};
