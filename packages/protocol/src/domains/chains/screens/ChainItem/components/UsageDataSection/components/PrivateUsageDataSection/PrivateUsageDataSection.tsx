import { IApiChain } from 'domains/chains/api/queryChains';
import { ChainType, Timeframe } from 'domains/chains/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { usePrivateUsageData } from './usePrivateUsageData';
import { PrivateUsageSection } from './components/PrivateUsageSection';

export interface PrivateUsageDataSectionProps {
  chain: IApiChain;
  chainType: ChainType;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const PrivateUsageDataSection = ({
  chain,
  chainType,
  group,
  timeframe,
  timeframeTabs,
}: PrivateUsageDataSectionProps) => {
  const usageDataProps = usePrivateUsageData({
    chain,
    chainType,
    group,
    timeframe,
  });

  return (
    <PrivateUsageSection
      {...usageDataProps}
      timeframeTabs={timeframeTabs}
      timeframe={timeframe}
    />
  );
};
