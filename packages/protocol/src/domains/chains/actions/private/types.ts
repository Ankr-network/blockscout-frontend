import { IApiUserGroupParams } from 'multirpc-sdk';
import { Chain, ChainType } from '@ankr.com/chains-list';

import { Gateway } from 'domains/dashboard/types';
import { ChainGroupID } from 'modules/endpoints/types';

export type FetchChainsStatsParams = IApiUserGroupParams & Gateway;

export interface IPrivateChainItemDetails {
  chain: Chain;
  selectedType?: ChainType;
  selectedGroupId?: ChainGroupID;
}
