import { useAuth } from 'domains/auth/hooks/useAuth';
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
}

export const UsageDataSection = (props: UsageDataSectionProps) => {
  const { hasPrivateAccess } = useAuth();

  return hasPrivateAccess ? (
    <PrivateUsageDataSection {...props} />
  ) : (
    <PublicUsageDataSection {...props} />
  );
};
