import { IUsageEntity } from 'multirpc-sdk';
import { TUserBlockchainAction } from './types';

export const getBlockchainActions = (usage: IUsageEntity[]) => {
  const result: TUserBlockchainAction[] = [];

  usage.forEach(blockchainUsage => {
    const { blockchain, details } = blockchainUsage;
    const currentBlockchainActions = details.map(detail => ({
      ...detail,
      blockchain,
    }));

    result.push(...currentBlockchainActions);
  });

  return result;
};
