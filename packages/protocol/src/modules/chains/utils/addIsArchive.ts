import { INodesDetailEntity } from 'multirpc-sdk';

import { Chain } from 'modules/chains/types';

export const getAddIsArchiveCB =
  (nodes: INodesDetailEntity[] = []) =>
  (chain: Chain) => ({
    ...chain,
    isArchive: nodes?.some(item => item.id === chain.id && item.hasArchive),
  });
