import { t } from '@ankr.com/common';

import { EnterpriseClientJWT } from 'domains/enterprise/store/selectors';
import { PrimaryTab } from 'modules/common/components/PrimaryTab';
import { SectionID } from 'domains/chains/screens/ChainPage/components/ChainItemSections/types';
import { UsageDataSectionParams } from 'domains/chains/screens/ChainPage/components/ChainItemSections/hooks/useUsageDataSection';

import { EnterpriseUsageDataSection } from '../EnterpriseUsageDataSection';

interface EnterpriseUsageDataSectionParams extends UsageDataSectionParams {
  apiKeys: EnterpriseClientJWT[];
}

export const useUsageDataSection = ({
  apiKeys,
  chain,
  chainSubType,
  chainType,
  getSelectHandler,
  group,
  timeframe,
  timeframeTabs,
}: EnterpriseUsageDataSectionParams) => {
  return {
    id: SectionID.UsageData,
    content: (
      <EnterpriseUsageDataSection
        chain={chain}
        chainType={chainType}
        chainSubType={chainSubType}
        group={group}
        timeframe={timeframe}
        timeframeTabs={timeframeTabs}
        apiKeys={apiKeys}
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
};
