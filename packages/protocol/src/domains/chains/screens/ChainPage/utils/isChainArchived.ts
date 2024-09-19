import { INodesDetailEntity } from 'multirpc-sdk';

export const isChainArchived = (
  nodes?: INodesDetailEntity[],
  chainId?: string,
) => {
  return Boolean(nodes?.find(item => item.id === chainId)?.hasArchive);
};
