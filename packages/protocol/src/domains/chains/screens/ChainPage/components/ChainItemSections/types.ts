import { Chain, ChainSubType, ChainType } from '@ankr.com/chains-list';

import { EndpointGroup } from 'modules/endpoints/types';

export enum SectionID {
  DebugMenu = 'debug-menu',
  GetStarted = 'get-started',
  Infrastructure = 'infrastructure',
  UsageData = 'usage-data',
}

export interface IChainItemTabsProps {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  chain: Chain;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}
