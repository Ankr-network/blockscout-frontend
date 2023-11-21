import { ChainID } from 'modules/chains/types';
import { ChainGroupID } from 'modules/endpoints/types';

export const hasGroupSelector = (chainId: ChainID, groupID: ChainGroupID) => {
  return chainId === ChainID.BASE && groupID === ChainGroupID.GOERLI;
};
