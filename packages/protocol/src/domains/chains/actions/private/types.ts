import { IApiUserGroupParams } from 'multirpc-sdk';

import { Gateway } from 'domains/dashboard/types';
import { Chain, ChainType } from 'modules/chains/types';
import { ChainGroupID } from 'modules/endpoints/types';

export type FetchChainsStatsParams = IApiUserGroupParams & Gateway;

export interface IPrivateChainItemDetails {
  chain: Chain;
  selectedType?: ChainType;
  selectedGroupId?: ChainGroupID;
}
