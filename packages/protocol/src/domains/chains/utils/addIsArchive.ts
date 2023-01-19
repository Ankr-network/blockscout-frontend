import { INodesDetailEntity } from 'multirpc-sdk';
import { IApiChain } from '../api/queryChains';

export const getAddIsArchiveCB =
  (nodes: INodesDetailEntity[] = []) =>
  (chain: IApiChain) => ({
    ...chain,
    isArchive: nodes?.some(item => item.id === chain.id && item.hasArchive),
  });
