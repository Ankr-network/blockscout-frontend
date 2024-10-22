// @ts-nocheck
import { useMemo } from 'react';

import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import {
  UseSectionsParams,
  useAvailableSections,
} from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useAvailableSections';
import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { SectionID } from 'domains/chains/screens/ChainPage/components/ChainItemSections/types';
import { SectionsBase } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useSectionsTabs';
import { hasWsFeature } from 'domains/projects/utils/hasWsFeature';
import { useInitialSection } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useInitialSection';
import { useRedirect } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useRedirect';

import { useGetStartedSection } from './useGetStartedSection';
import { useUsageDataSection } from './useUsageDataSection';

interface EnterpriseUseSectionsParams extends UseSectionsParams {
  apiKeys: EnterpriseClientJWT[];
}

export const useSectionsTabs = ({
  apiKeys,
  chain,
  chainSubType,
  chainType,
  group,
  publicUrl,
}: EnterpriseUseSectionsParams): SectionsBase => {
  const hasWssAccess = useMemo(() => hasWsFeature(chain), [chain]);

  const { getSelectHandler, timeframe, timeframeTabs } = useAvailableSections({
    chainType,
    chainSubType,
    chain,
    group,
    publicUrl,
    hasWssAccess,
  });

  const usageDataSection = useUsageDataSection({
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
    timeframe,
    timeframeTabs,
    apiKeys,
  });

  const getStartedSection = useGetStartedSection({
    chainId: chain.id,
    getSelectHandler,
    group,
    publicUrl,
    hasWssAccess,
  });

  const tabs = [getStartedSection, usageDataSection].filter(
    Boolean,
  ) as Tab<SectionID>[];

  const initialTabID = useInitialSection(tabs);

  const onTabSelect = useRedirect(chain.id);

  const [sections, section] = useTabs({
    initialTabID,
    onTabSelect,
    tabs,
  });

  return { section, sections };
};
