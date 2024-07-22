import { useMemo } from 'react';
import { t } from '@ankr.com/common';

import {
  Chain,
  ChainSubType,
  ChainType,
  Timeframe,
} from 'modules/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { Tab } from 'modules/common/hooks/useTabs';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useEnterpriseClientStatus } from 'domains/auth/hooks/useEnterpriseClientStatus';
import { PrimaryTab } from 'modules/common/components/PrimaryTab';
import { NoReactSnap } from 'uiKit/NoReactSnap';

import { SectionID } from '../types';
import { TabSelectHandlerGetter } from './useTabSelectHandlerGetter';
import { UsageDataSection } from '../../UsageDataSection';

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
  chainSubType,
  chainType,
  getSelectHandler,
  group,
  timeframe,
  timeframeTabs,
}: UsageDataSectionParams) => {
  const { hasPremium, hasPrivateAccess, isLoggedIn } = useAuth();
  const { isEnterpriseClient } = useEnterpriseClientStatus();
  const shouldHideUsageData = !hasPremium && isLoggedIn && !isEnterpriseClient;

  return useMemo(() => {
    if (shouldHideUsageData) return null;

    return {
      id: SectionID.UsageData,
      content: (
        <NoReactSnap>
          <UsageDataSection
            chain={chain}
            chainType={chainType}
            chainSubType={chainSubType}
            group={group}
            timeframe={timeframe}
            timeframeTabs={timeframeTabs}
            hasPrivateAccess={hasPrivateAccess || isEnterpriseClient}
          />
        </NoReactSnap>
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
    shouldHideUsageData,
    chain,
    chainType,
    chainSubType,
    group,
    timeframe,
    timeframeTabs,
    hasPrivateAccess,
    isEnterpriseClient,
    getSelectHandler,
  ]);
};
