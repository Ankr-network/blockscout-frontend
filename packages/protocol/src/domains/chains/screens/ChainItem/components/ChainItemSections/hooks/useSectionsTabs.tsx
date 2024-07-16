import { Timeframe } from 'modules/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';

import { SectionID } from '../types';
import { useInitialSection } from './useInitialSection';
import { useRedirect } from './useRedirect';
import {
  useAvailableSections,
  UseSectionsParams,
} from './useAvailableSections';

export interface SectionsBase {
  section?: Tab<SectionID>;
  sections: Tab<SectionID>[];
}

export interface Sections extends SectionsBase {
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
  hasPrivateAccess?: boolean;
}

export const useSectionsTabs = ({
  chain,
  chainSubType,
  chainType,
  group,
  hasPrivateAccess,
  publicUrl,
}: UseSectionsParams): Sections => {
  const {
    debugMenuSection,
    getStartedSection,
    infrastructureSection,
    timeframe,
    timeframeTabs,
    usageDataSection,
  } = useAvailableSections({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl,
    hasPrivateAccess,
  });

  const tabs = [
    getStartedSection,
    debugMenuSection,
    usageDataSection,
    infrastructureSection,
  ].filter(Boolean) as Tab<SectionID>[];

  const initialTabID = useInitialSection(tabs);

  const onTabSelect = useRedirect(chain.id);

  const [sections, section] = useTabs({
    initialTabID,
    onTabSelect,
    tabs,
  });

  return { section, sections, timeframe, timeframeTabs };
};
