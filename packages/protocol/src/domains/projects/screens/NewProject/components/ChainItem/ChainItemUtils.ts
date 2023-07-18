import { ChainType } from 'domains/chains/types';
import { ChainGroupID } from 'modules/endpoints/types';

export const shouldShowGroupId = (chainType?: string, groupId?: string) => {
  if (chainType === ChainType.Mainnet) return false;

  return groupId && groupId !== ChainGroupID.STANDARD_EVM;
};
