import { IChainItemDetails } from 'domains/chains/actions/fetchChain';
import { Tab, useTabs } from 'modules/common/hooks/useTabs';
import { EndpointGroup } from 'modules/endpoints/types';
import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { DataUsageContent } from '../../DataUsageContent';
import { GetStartedContent } from '../../GetStartedContent';
import { InfrastructureContent } from '../../InfrastructureContent';
import { ChainItemTab } from '../components/ChainItemTab';
import { TabId } from '../types';
import { useInitialTabId } from './useInitialTabId';
import { useRedirect } from './useRedirect';

export interface ChainItemTabsParams {
  data: IChainItemDetails;
  group: EndpointGroup;
}

export const useChainItemTabs = ({ data, group }: ChainItemTabsParams) => {
  const { chain } = data;
  const chainId = chain.id;

  const initialTabID = useInitialTabId();

  const rawTabs: Tab<TabId>[] = useLocaleMemo(
    () => [
      {
        id: TabId.GetStarted,
        content: <GetStartedContent chain={chain} group={group} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.get-started')}
          />
        ),
      },
      {
        id: TabId.UsageData,
        content: <DataUsageContent chainId={chainId} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.usage-data')}
          />
        ),
      },
      {
        id: TabId.Infrastructure,
        content: <InfrastructureContent chain={chain} group={group} />,
        title: (isSelected: boolean) => (
          <ChainItemTab
            isSelected={isSelected}
            label={t('chain-item.tabs.infrastructure')}
          />
        ),
      },
    ],
    [chain, chainId, data, group],
  );

  const redirect = useRedirect(chainId);

  return useTabs({
    initialTabID,
    onTabSelect: redirect,
    tabs: rawTabs,
  });
};
