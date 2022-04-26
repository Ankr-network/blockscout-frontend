import { MultiService } from 'modules/api/MultiService';

export const getBlocksCount = () => {
  const { service } = MultiService.getInstance();

  const { blocksCount } = service;

  return blocksCount;
};
