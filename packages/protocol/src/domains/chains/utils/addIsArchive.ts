import { INodeEntity } from 'multirpc-sdk';
import { IApiChain } from '../api/queryChains';

export const getAddIsArchiveCB =
  (nodes: INodeEntity[] = []) =>
  (chain: IApiChain) => ({
    ...chain,
    isArchive: nodes?.some(
      item => item.blockchain === chain.id && item.isArchive,
    ),
  });
