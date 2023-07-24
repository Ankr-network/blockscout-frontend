import { useMemo } from 'react';

import { ChainSubType, ChainType, Timeframe } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { IChainItemDetails } from 'domains/chains/actions/public/fetchPublicChain';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';

import { SectionID } from '../types';
import { useDebugMenuSection } from './useDebugMenuSection';
import { useGetStartedSection } from './useGetStartedSection';
import { useInfrastructureSection } from './useInfrastructureSection';
import { useInitialSection } from './useInitialSection';
import { useRedirect } from './useRedirect';
import { useTabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { useTimeframe } from './useTimeframe';
import { useUsageDataSection } from './useUsageDataSection';

export interface SectionsParams {
  chainType: ChainType;
  chainSubType?: ChainSubType;
  data: IChainItemDetails;
  group: EndpointGroup;
  publicUrl: string;
}

export interface Sections {
  section?: Tab<SectionID>;
  sections: Tab<SectionID>[];
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const useSections = ({
  chainType,
  chainSubType,
  data,
  group,
  publicUrl,
}: SectionsParams): Sections => {
  const { chain } = data;
  const chainId = chain.id;

  const { timeframe, timeframeTabs } = useTimeframe();

  const getSelectHandler = useTabSelectHandlerGetter();

  const getStartedSection = useGetStartedSection({
    chainId,
    getSelectHandler,
    group,
    publicUrl,
  });

  const debugMenuSection = useDebugMenuSection({
    chainId,
    getSelectHandler,
    group,
    publicUrl,
  });

  const usageDataSection = useUsageDataSection({
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
    timeframe,
    timeframeTabs,
  });

  const infrastructureSection = useInfrastructureSection({
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
  });

  const tabs: Tab<SectionID>[] = useMemo(
    () =>
      [
        getStartedSection,
        debugMenuSection,
        usageDataSection,
        infrastructureSection,
      ].filter((section): section is Tab<SectionID> => !!section),
    [
      getStartedSection,
      debugMenuSection,
      usageDataSection,
      infrastructureSection,
    ],
  );

  const initialTabID = useInitialSection(tabs);

  const onTabSelect = useRedirect(chainId);

  const [sections, section] = useTabs({ initialTabID, onTabSelect, tabs });

  return { section, sections, timeframe, timeframeTabs };
};
