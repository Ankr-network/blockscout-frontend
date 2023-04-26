import { Chain, ChainType, Timeframe } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { PrivateUsageDataSection } from './components/PrivateUsageDataSection';
import { PublicUsageDataSection } from './components/PublicUsageDataSection';

export interface UsageDataSectionProps {
  chain: Chain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
  hasPrivateAccess?: boolean;
}

export const UsageDataSection = ({
  hasPrivateAccess,
  ...others
}: UsageDataSectionProps) => {
  return hasPrivateAccess ? (
    <PrivateUsageDataSection {...others} />
  ) : (
    <PublicUsageDataSection {...others} />
  );
};
