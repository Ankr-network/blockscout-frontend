import { useMemo } from 'react';

import { ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { SectionID } from '../types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { useGetStartedSection } from './useGetStartedSection';
import { useInfrastructureSection } from './useInfrastructureSection';
import { useInitialSection } from './useInitialSection';
import { useRedirect } from './useRedirect';
import { useTimeframe } from './useTimeframe';
import { useUsageDataSection } from './useUsageDataSection';

export interface SectionsParams {
  chainType: ChainType;
  data: IChainItemDetails;
  group: EndpointGroup;
  unfilteredGroup: EndpointGroup;
}

export interface Sections {
  section?: Tab<SectionID>;
  sections: Tab<SectionID>[];
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const useSections = ({
  chainType,
  data,
  group,
  unfilteredGroup,
}: SectionsParams): Sections => {
  const { chain } = data;
  const chainId = chain.id;

  const { timeframe, timeframeTabs } = useTimeframe();

  const getStartedSection = useGetStartedSection({
    chainId,
    group,
    unfilteredGroup,
  });
  const usageDataSection = useUsageDataSection({
    chain,
    chainType,
    group,
    timeframe,
    timeframeTabs,
  });
  const infrastructureSection = useInfrastructureSection({ chain, group });

  const tabs: Tab<SectionID>[] = useMemo(
    () =>
      [getStartedSection, usageDataSection, infrastructureSection].filter(
        (section): section is Tab<SectionID> => !!section,
      ),
    [getStartedSection, usageDataSection, infrastructureSection],
  );

  const initialTabID = useInitialSection(tabs);

  const onTabSelect = useRedirect(chainId);

  const [sections, section] = useTabs({ initialTabID, onTabSelect, tabs });

  return { section, sections, timeframe, timeframeTabs };
};
