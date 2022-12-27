import { useAuth } from 'domains/auth/hooks/useAuth';
import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType, Timeframe } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { PrivateUsageDataSection } from './components/PrivateUsageDataSection/PrivateUsageDataSection';
import { PublicUsageDataSection } from './components/PublicUsageDataSection/PublicUsageDataSection';

export interface UsageDataSectionProps {
  chain: IApiChain;
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
