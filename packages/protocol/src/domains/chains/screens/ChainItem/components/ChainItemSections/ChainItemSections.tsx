import { Chain, ChainSubType, ChainType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';

export interface IChainItemTabsProps {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  chain: Chain;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}
