import { ChainID } from '@ankr.com/chains-list';

import {
  ChainGroupID,
  FLARE_TESTNETS_GROUPS_LIST,
} from 'modules/endpoints/types';

export const hasGroupSelector = (chainId: ChainID, groupID: ChainGroupID) => {
  return (
    (chainId === ChainID.BASE && groupID === ChainGroupID.GOERLI) ||
    (chainId === ChainID.FLARE && FLARE_TESTNETS_GROUPS_LIST.includes(groupID))
  );
};
