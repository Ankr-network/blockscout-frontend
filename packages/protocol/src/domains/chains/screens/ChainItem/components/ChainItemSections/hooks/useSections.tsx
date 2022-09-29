import { useMemo } from 'react';

import { useAuth } from 'domains/auth/hooks/useAuth';
import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { ChainType, Timeframe } from 'domains/chains/types';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { ChainGroupID, EndpointGroup } from 'modules/endpoints/types';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { GetStartedSection } from '../../GetStartedSection';
import { InfrastructureSection } from '../../InfrastructureSection';
import { PrimaryTab } from '../../PrimaryTab';
import { UsageDataSection } from '../../UsageDataSection';
import { SectionID } from '../types';
import { useInitialSection } from './useInitialSection';
import { useRedirect } from './useRedirect';
import { useTimeframe } from './useTimeframe';
import { ChainID } from 'modules/chains/types';

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

const getStarted = t('chain-item.tabs.get-started');
const usageData = t('chain-item.tabs.usage-data');
const infrastructure = t('chain-item.tabs.infrastructure');

export const useSections = ({
  chainType,
  data,
  group,
  unfilteredGroup,
}: SectionsParams): Sections => {
  const { chain } = data;
  const chainId = chain.id;

  let initialTabID = useInitialSection();
  const { timeframe, timeframeTabs } = useTimeframe();

  const getStartedSection = useMemo(
    () => ({
      id: SectionID.GetStarted,
      content: (
        <GetStartedSection
          group={group}
          unfilteredGroup={unfilteredGroup}
          chainId={chainId}
        />
      ),
      title: (isSelected: boolean) => (
        <PrimaryTab isSelected={isSelected} label={getStarted} />
      ),
    }),
    [group, unfilteredGroup, chainId],
  );

  const tabs: Tab<SectionID>[] = useLocaleMemo(
    () => [
      {
        id: SectionID.UsageData,
        content: (
          <UsageDataSection
            chain={chain}
            chainType={chainType}
            group={group}
            timeframe={timeframe}
            timeframeTabs={timeframeTabs}
          />
        ),
        title: (isSelected: boolean) => (
          <PrimaryTab isSelected={isSelected} label={usageData} />
        ),
      },
      {
        id: SectionID.Infrastructure,
        content: <InfrastructureSection chain={chain} group={group} />,
        title: (isSelected: boolean) => (
          <PrimaryTab isSelected={isSelected} label={infrastructure} />
        ),
      },
    ],
    [chain, chainType, data, group, timeframe, timeframeTabs],
  );

  // TODO: Remove after adding ChainFlow to GetStartedSection
  const { credentials, loading } = useAuth();
  const isUpgraded = credentials || loading;

  const getStartedHasContent =
    !isUpgraded ||
    isGroupEvmBased(group) ||
    chainId === ChainID.TRON ||
    group.id === ChainGroupID.C_CHAIN ||
    group.id === ChainGroupID.P_CHAIN;

  if (!getStartedHasContent && initialTabID === SectionID.GetStarted) {
    initialTabID = SectionID.UsageData;
  }

  if (getStartedHasContent) {
    tabs.unshift(getStartedSection);
  }

  const onTabSelect = useRedirect(chainId);

  const [sections, section] = useTabs({ initialTabID, onTabSelect, tabs });

  return { section, sections, timeframe, timeframeTabs };
};
