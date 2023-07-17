import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { PrimaryTab } from '../../PrimaryTab';
import { SectionID } from '../types';
import { Tab } from 'modules/common/hooks/useTabs';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { UsageDataSection } from '../../UsageDataSection';
import { useAuth } from 'domains/auth/hooks/useAuth';

export interface UsageDataSectionParams {
  chain: Chain;
  chainType: ChainType;
  chainSubType?: ChainSubType;
  getSelectHandler: TabSelectHandlerGetter;
  group: EndpointGroup;
  timeframe: Timeframe;
  timeframeTabs: Tab<Timeframe>[];
}

export const useUsageDataSection = ({
  chain,
  chainType,
  chainSubType,
  getSelectHandler,
  group,
  timeframe,
  timeframeTabs,
}: UsageDataSectionParams) => {
  const { hasPremium, hasPrivateAccess, isLoggedIn } = useAuth();
  const shouldHideUsageData = !hasPremium && isLoggedIn;

  return useMemo(() => {
    if (shouldHideUsageData) return null;

    return {
      id: SectionID.UsageData,
      content: (
        <UsageDataSection
          chain={chain}
          chainType={chainType}
          chainSubType={chainSubType}
          group={group}
          timeframe={timeframe}
          timeframeTabs={timeframeTabs}
          hasPrivateAccess={hasPrivateAccess}
        />
      ),
      onSelect: getSelectHandler(SectionID.UsageData),
      title: (isSelected: boolean) => (
        <PrimaryTab
          isSelected={isSelected}
          label={t('chain-item.tabs.usage-data')}
        />
      ),
    };
  }, [
    chain,
    chainType,
    chainSubType,
    getSelectHandler,
    group,
    timeframe,
    timeframeTabs,
    shouldHideUsageData,
    hasPrivateAccess,
  ]);
};
