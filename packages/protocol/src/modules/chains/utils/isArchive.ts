import { INodesDetailEntity } from 'multirpc-sdk';

import { Chain } from 'modules/chains/types';

export const checkIsArchive = (
  nodes: INodesDetailEntity[] = [],
  chainId: string,
) => {
  return nodes.some(item => item.id === chainId && item.hasArchive);
};

export const getAddIsArchiveCB =
  (nodes: INodesDetailEntity[] = []) =>
  (chain: Chain) => ({
    ...chain,
    isArchive: checkIsArchive(nodes, chain.id),
  });
